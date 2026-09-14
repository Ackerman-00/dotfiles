// lottery.glsl — a random open animation every time.
// umbriel_random_seed.x picks one of seven effects per transition:
//   0 = holes, 1 = bloom, 2 = watr, 3 = reveal (wipe),
//   4 = poof (breathe), 5 = cat-map (toral stir), 6 = spiral (swirl).
// Left out: glitchbit (headache), blinds/squash (rejected),
// halftone (ends transparent = blink), dissipate (blackout on dark backdrop),
// bijection-flow (retired).
// Shared fade-in and clean resolve envelope so endpoints never pop.

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
        sum += vnoise(p) * amp;
        p *= 2.0;
        amp *= 0.5;
    }
    return sum;
}

// --- effect 0: holes ---
vec2 hole_rand(vec2 cell) {
    vec2 seed = vec2(
        dot(cell, vec2(127.1, 311.7)),
        dot(cell, vec2(269.5, 183.3))
    );
    return fract(sin(seed) * 43758.5453123);
}

vec4 fx_holes(vec2 uv, float visible) {
    float spacing = 72.0;
    float jitter = 0.70;
    vec2 logical = (uv - 0.5) * max(umbriel_size, vec2(1.0));
    vec2 point = logical / spacing;
    vec2 base = floor(point);
    vec2 local = fract(point);
    float feather = 1.35 / spacing;
    float mask = 1.0;
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 offset = vec2(float(x), float(y));
            vec2 id = base + offset;
            vec2 rv = hole_rand(id);
            vec2 center = offset + 0.5 + (rv - 0.5) * jitter;
            float close_start = 0.02 + 0.12 * rv.x;
            float close_end = 0.72 + 0.22 * rv.y;
            float closed = smoothstep(close_start, close_end, visible);
            closed = pow(closed, 0.55);
            float size_seed = fract(rv.x * 17.0 + rv.y * 29.0);
            float size_curve = mix(0.45, 2.20, size_seed);
            float hole_open = pow(1.0 - closed, size_curve);
            float radius = mix(-feather, 1.30, hole_open);
            float outside = smoothstep(
                radius - feather,
                radius + feather,
                length(local - center)
            );
            mask = min(mask, outside);
        }
    }
    return umbriel_sample(uv) * mask;
}

// --- effect 1: bloom ---
vec4 fx_bloom(vec2 uv, float visible) {
    float p = smoothstep(0.0, 1.0, visible);
    float scale = mix(0.01, 1.0, p);
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}

// --- effect 2: watr ---
vec4 fx_watr(vec2 uv, float amount, float seed) {
    float surface = mix(1.15, -0.2, amount);
    float n = fbm(vec2(uv.x * 6.0 + seed, amount * 4.0)) - 0.5;
    float surfaceLine = surface + n * 0.06;
    float distToSurface = uv.y - surfaceLine;
    float nearSurface = exp(-10.0 * abs(distToSurface));
    float swayNoise = fbm(vec2(uv.x * 10.0 + seed, uv.y * 6.0 + amount * 6.0)) - 0.5;
    float sway = swayNoise * 0.035 * nearSurface;
    vec4 color = umbriel_sample(vec2(uv.x + sway, uv.y));
    float mask = smoothstep(surfaceLine - 0.012, surfaceLine + 0.012, uv.y);
    float dropletBand = smoothstep(0.0, 0.08, distToSurface) * smoothstep(0.18, 0.08, distToSurface);
    float dropletMask = step(0.93, hash(floor(vec2(uv.x * 24.0, amount * 10.0)) + seed));
    float dropletVisibility = smoothstep(0.0, 0.15, amount) * smoothstep(1.0, 0.85, amount);
    mask = max(mask, dropletBand * dropletMask * dropletVisibility);
    color.a *= mask;
    color.rgb *= mask;
    return color;
}

// --- effect 3: reveal (left-to-right wipe, bundled style) ---
vec4 fx_reveal(vec2 uv, float visible) {
    float edge = mix(-0.02, 1.02, visible);
    float mask = 1.0 - smoothstep(edge - 0.02, edge + 0.02, uv.x);
    return umbriel_sample(uv) * mask;
}

// --- effect 4: poof (gentle breathe, no flash, no transparency) ---
vec4 fx_poof(vec2 uv, float p) {
    float pulse = sin(3.14159265 * p);
    float scale = 1.0 + 0.08 * pulse;
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}

// --- effect 5: cat-map (Arnold toral stir, by samiser) ---
const int CAT_MAX = 12;

vec4 fx_cat(vec2 uv, float p) {
    float k = floor(float(CAT_MAX) * sin(3.14159265 * p));
    float a = 1.0, b = 0.0;
    for (int i = 0; i < 2 * CAT_MAX; i++) {
        if (float(i) < 2.0 * k) { float t = a + b; b = a; a = t; }
    }
    vec2 q = fract(vec2(a * uv.x + b * uv.y, b * uv.x + (a - b) * uv.y));
    return umbriel_sample(q);
}

// --- effect 6: spiral (swirl reveal + CA + rim) ---
vec4 fx_spiral(vec2 uv) {
    float p = umbriel_direction > 0.0 ? umbriel_clamped_progress : 1.0 - umbriel_clamped_progress;
    p = pow(p, 1.3);
    float ep = smoothstep(0.0, 1.0, p);
    float un = 1.0 - ep;
    float aspect = umbriel_size.x / umbriel_size.y;
    vec2 scaleV = vec2(aspect, 1.0);
    vec2 diff = (uv - 0.5) * scaleV;
    float dist = length(diff);
    float ang = atan(diff.y, diff.x);
    float edge = 0.07;
    float maxDist = length(vec2(0.5 * aspect, 0.5));
    float radius = ep * (maxDist + edge);
    float mask = 1.0 - smoothstep(radius - edge, radius, dist);
    float swirl = un * un * 3.5 * max(1.0 - dist / (maxDist + 0.001), 0.0);
    swirl *= umbriel_direction;
    float scl = mix(1.18, 1.0, ep);
    float newAng = ang + swirl;
    vec2 warped = vec2(cos(newAng), sin(newAng)) * dist;
    vec2 sampleUv = 0.5 + (warped / scl) / scaleV;
    float ca = un * 0.018 * dist;
    vec2 caDir = dist > 0.0001 ? diff / dist : vec2(0.0);
    vec2 caOff = (caDir / scaleV) * ca;
    vec4 cR = umbriel_sample(sampleUv + caOff);
    vec4 cG = umbriel_sample(sampleUv);
    vec4 cB = umbriel_sample(sampleUv - caOff);
    vec4 col = vec4(cR.r, cG.g, cB.b, cG.a);
    float rim = mask * (1.0 - mask) * 4.0;
    vec3 glow = vec3(0.35, 0.75, 1.0) * rim * (0.6 + 0.4 * un);
    vec3 outRgb = col.rgb * mask + glow;
    float outA = clamp(col.a * mask + rim, 0.0, 1.0);
    return vec4(outRgb, outA);
}

vec4 animation(vec2 uv) {
    float p = umbriel_linear_progress;
    vec4 src = umbriel_sample(uv);
    if (p > 0.985) {
        return src;
    }

    float amount = umbriel_direction > 0.0
        ? umbriel_clamped_progress : 1.0 - umbriel_clamped_progress;

    int pick = int(floor(umbriel_random_seed.x * 7.0));
    vec4 fx;
    if (pick == 0) {
        fx = fx_holes(uv, amount);
    } else if (pick == 1) {
        fx = fx_bloom(uv, amount);
    } else if (pick == 2) {
        fx = fx_watr(uv, amount, umbriel_random_seed.y * 20.0 + umbriel_random_seed.w);
    } else if (pick == 3) {
        fx = fx_reveal(uv, amount);
    } else if (pick == 4) {
        fx = fx_poof(uv, p);
    } else if (pick == 5) {
        fx = fx_cat(uv, p);
    } else {
        fx = fx_spiral(uv);
    }

    float enter = smoothstep(0.0, 0.08, p);
    fx.a *= enter;
    fx.rgb *= enter;
    return mix(fx, src, smoothstep(0.6, 1.0, p));
}
