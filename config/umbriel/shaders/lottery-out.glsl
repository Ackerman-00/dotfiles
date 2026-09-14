// lottery-out.glsl — a random close animation every time.
// umbriel_random_seed.x picks one of five effects per transition:
//   0 = life (cells), 1 = holes-out, 2 = bloom, 3 = watr, 4 = reveal.
// All five end fully transparent, as a close effect must. No resolve
// envelope (that would pop the window back at the end).

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

// --- effect 0: life (by samiser) ---
const float LIFE_CELL_PX = 3.0;
const float LIFE_FADE_START = 0.5;

float life_fade() {
    return 1.0 - smoothstep(LIFE_FADE_START, 1.0, umbriel_linear_progress);
}

float life_hash(vec2 p) {
    p = fract(p * vec2(443.897, 441.423) + umbriel_random_seed.xy);
    p += dot(p, p.yx + 19.19);
    return fract(p.x * p.y);
}

float life_alive(vec2 q) {
    float a = umbriel_sample(q).a * max(life_fade(), 0.05);
    return a > 0.002 && umbriel_sample_previous(q).a > 0.5 * a ? 1.0 : 0.0;
}

vec4 fx_life(vec2 uv) {
    vec4 src = umbriel_sample(uv);
    vec2 cell = LIFE_CELL_PX / umbriel_size;
    vec2 id = floor(uv / cell);
    vec2 q = (id + 0.5) * cell;
    float n = 0.0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            n += life_alive(q + vec2(float(i), float(j)) * cell);
        }
    }
    float me = life_alive(q);
    n -= me;
    float state;
    if (me > 0.5 && n == 8.0) {
        vec4 centre = umbriel_sample(q);
        float lum = dot(centre.rgb, vec3(0.299, 0.587, 0.114));
        state = life_hash(id) < mix(0.25, 0.45, lum) ? 1.0 : 0.0;
    } else {
        bool highlife = umbriel_random_seed.z > 0.5;
        bool birth = n == 3.0 || (highlife && n == 6.0);
        bool survive = n == 2.0 || n == 3.0;
        state = me > 0.5 ? (survive ? 1.0 : 0.0) : (birth ? 1.0 : 0.0);
    }
    return src * state * life_fade();
}

// --- effect 1: holes-out ---
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

// --- effect 2: bloom (reversed by amount) ---
vec4 fx_bloom(vec2 uv, float visible) {
    float p = smoothstep(0.0, 1.0, visible);
    float scale = mix(0.01, 1.0, p);
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}

// --- effect 3: watr (reversed by amount) ---
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

// --- effect 4: reveal (reversed by amount) ---
vec4 fx_reveal(vec2 uv, float visible) {
    float edge = mix(-0.02, 1.02, visible);
    float mask = 1.0 - smoothstep(edge - 0.02, edge + 0.02, uv.x);
    return umbriel_sample(uv) * mask;
}

vec4 animation(vec2 uv) {
    float amount = umbriel_direction > 0.0
        ? umbriel_clamped_progress : 1.0 - umbriel_clamped_progress;

    int pick = int(floor(umbriel_random_seed.x * 5.0));
    if (pick == 0) {
        return fx_life(uv);
    } else if (pick == 1) {
        return fx_holes(uv, amount);
    } else if (pick == 2) {
        return fx_bloom(uv, amount);
    } else if (pick == 3) {
        return fx_watr(uv, amount, umbriel_random_seed.y * 20.0 + umbriel_random_seed.w);
    } else {
        return fx_reveal(uv, amount);
    }
}
