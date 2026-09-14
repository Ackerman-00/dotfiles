// poof.glsl — airy maximize/minimize without touching transparency.
// The window breathes outward with a soft white lift mid-transition,
// then lands solid. Alpha is never eroded, so no black backdrop bleeds through.
vec4 animation(vec2 uv) {
    float p = umbriel_clamped_progress;
    float pulse = sin(3.14159265 * p);
    float scale = 1.0 + 0.08 * pulse;
    vec4 color = umbriel_sample((uv - 0.5) / scale + 0.5);
    return color;
}
