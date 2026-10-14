// open.glsl — Ported from skwd-wall perlin transition.
// Perlin-noise dissolve reveal. Direction-aware via umbriel_direction,
// so the same logic serves opens (0 -> 1) and closes (1 -> 0).

float perlin_random(vec2 co) {
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy, vec2(a, b));
    float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}

float perlin_noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = perlin_random(i);
    float b = perlin_random(i + vec2(1.0, 0.0));
    float c = perlin_random(i + vec2(0.0, 1.0));
    float d = perlin_random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

vec4 animation(vec2 uv) {
    float pr = umbriel_direction > 0.0 ? umbriel_clamped_progress : 1.0 - umbriel_clamped_progress;
    vec4 win = umbriel_sample(uv);

    float aspect = umbriel_size.x / umbriel_size.y;
    vec2 noise_uv = uv * vec2(aspect, 1.0);

    float scale = 4.0;
    float smoothness = 0.2;
    float n = perlin_noise(noise_uv * scale);
    float p = mix(-smoothness, 1.0 + smoothness, pr);
    float lower = p - smoothness;
    float higher = p + smoothness;
    float q = smoothstep(lower, higher, n);
    float reveal = 1.0 - q;

    return win * reveal;
}
