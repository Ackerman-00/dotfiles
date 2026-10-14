// dissipate.glsl — vanish-like-air for movement/maximize.
// Mid-transition the window thins into rising wisps, then coalesces.
// Identity at both endpoints, so it never pops or leaves residue.

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
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
        sum += noise(p) * amp;
        p *= 2.0;
        amp *= 0.5;
    }
    return sum;
}

vec4 animation(vec2 uv) {
    float p = umbriel_clamped_progress;
    float pulse = sin(3.14159265 * p);
    float seed = hash(umbriel_size) * 20.0;

    // Wisps rise as the window thins.
    float rise = pulse * 0.03;
    float n = fbm(vec2(uv.x * 7.0 + seed, uv.y * 7.0 - p * 3.0 + seed));

    vec4 color = umbriel_sample(vec2(uv.x, uv.y - rise));

    // Erode by noise mid-transition; exactly solid at both ends.
    // At peak pulse the window is nearly gone — thin air.
    float mask = smoothstep(0.0, 0.9, n + (1.0 - pulse) * 1.0);
    mask *= 1.0 - 0.85 * pulse;

    color.a *= mask;
    color.rgb *= mask;
    return color;
}
