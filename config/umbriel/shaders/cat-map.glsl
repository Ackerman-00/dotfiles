// cat-map.glsl — by samiser (github.com/samiser/umbriel-shaders).
// Arnold's cat map: the window is stirred through the Fibonacci toral
// automorphism k times, k sweeping 0 -> 12 -> 0 over the transition.
// Saved verbatim: endpoints are identity by construction, ES 1.00-clean,
// and nearly free (no trig per pixel).
const int MAX_ITER = 12;

vec4 animation(vec2 uv) {
    float k = floor(float(MAX_ITER) * sin(3.14159265 * umbriel_clamped_progress));
    float a = 1.0, b = 0.0;
    for (int i = 0; i < 2 * MAX_ITER; i++) {
        if (float(i) < 2.0 * k) { float t = a + b; b = a; a = t; }
    }
    vec2 q = fract(vec2(a * uv.x + b * uv.y, b * uv.x + (a - b) * uv.y));
    return umbriel_sample(q);
}
