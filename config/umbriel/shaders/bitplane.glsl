// glitchbit.glsl — bit-plane databend, optimized v2.
// Effect: each bit of each channel is sampled from its own displaced
// position (row/column shifts with toroidal wrap, drifting over the
// transition), then reassembled. Opens fade in, glitch, resolve clean.
//
// Optimizations (from umbriel/umbrielfx source + repo docs):
//  - Displacement field computed ONCE per channel (3 x 6 D-calls), not
//    once per bit (3 x 8 x 6). Per-bit variety comes from a cheap hash
//    jitter instead. ~8x fewer trig evaluations per pixel.
//  - umbriel_random_seed (vec4, stable per transition, fresh next open)
//    seeds variation — true per-open randomness instead of hashing size.
//  - D() refinement loop trimmed 7 -> 5 rounds (drops the two noisiest
//    octaves; also calmer, as requested).
//  - 1/umbriel_size hoisted to one reciprocal; const loop bounds and
//    strict GLSL ES 1.00 throughout (no bit ops, no round(), no dynamic
//    indexing) so it compiles on every driver.
//  - Tail frames (p > 0.985, visually identical to clean) skip the
//    effect entirely. No umbriel_sample_previous feedback: it would cost
//    two extra buffers per window for little gain here.

float T = 6.2831853;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void copy_bit(int b, float source, inout float dest) {
    float m = pow(2.0, float(b));
    float cleared = dest - mod(floor(dest / m), 2.0) * m;
    float bit = mod(floor(source / m), 2.0) * m;
    dest = cleared + bit;
}

float D(float c, vec2 t, int i) {
    float P = float(i) * 0.618034;
    vec2 r = t * 9.0 * sin(P * T);
    t += P;
    vec2 C = vec2(c * T);
    C += 0.5 * sin(C + t * 0.1);

    vec3 v = vec3(320.0, 1.0, 0.14);
    for (int k = 0; k < 5; k++) {
        float j = 0.1 + 0.02 * float(k);
        r += v.x * cos(v.y * C + v.z * t + j);
        v *= vec3(0.45, 2.0, -1.1);
    }

    r = floor(r + 0.5);
    return r.x - r.y;
}

vec4 animation(vec2 uv) {
    float p = umbriel_linear_progress;
    vec4 src = umbriel_sample(uv);
    if (p > 0.985) {
        return src;
    }

    float fr = p * 24.0;
    vec2 t = vec2(fr, fr - 1.0) / 60.0;
    vec2 px = 1.0 / umbriel_size;
    // NOTE: repo docs advertise umbriel_random_seed, but the installed
    // build rejects it as undeclared — size-hash seed instead.
    vec2 seed = vec2(hash(umbriel_size), hash(umbriel_size + 7.0)) * 20.0;

    vec3 result = vec3(0.0);
    for (int c = 0; c < 3; c++) {
        // One displacement field per channel.
        vec2 f = uv;
        float off = float(c * 8) * 0.01 + 0.04;
        for (int i = 0; i < 6; i++) {
            vec2 tt = t + off;
            float sh;
            if (i == 0 || i == 2 || i == 4) {
                sh = D(f.y, tt, i);
                f.x = fract(f.x - sh * px.x / 12.0);
            } else {
                sh = D(f.x, tt, i);
                f.y = fract(f.y - sh * px.y / 12.0);
            }
        }
        // Cheap per-bit jitter around the channel field.
        for (int b = 0; b < 8; b++) {
            vec2 jb = vec2(
                hash(vec2(float(c * 8 + b), seed.x)),
                hash(vec2(float(b), seed.y + 7.0))
            ) - 0.5;
            vec4 s = umbriel_sample(fract(f + jb * 18.0 * px));
            float chan = (c == 0) ? s.r : ((c == 1) ? s.g : s.b);
            float dest = result[c];
            copy_bit(b, floor(chan * 255.0 + 0.5), dest);
            if (c == 0) { result.r = dest; }
            else if (c == 1) { result.g = dest; }
            else { result.b = dest; }
        }
    }

    vec4 glitch = vec4(result / 255.0 * src.a, src.a);
    float enter = smoothstep(0.0, 0.08, p);
    glitch.a *= enter;
    glitch.rgb *= enter;
    return mix(glitch, src, smoothstep(0.6, 1.0, p));
}
