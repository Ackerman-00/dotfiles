// settle.glsl — movement/maximize settle.
// The window gently overshoots scale mid-transition then lands flush.
// Identity at both endpoints, so it never pops or leaves residue.
vec4 animation(vec2 uv) {
    float p = umbriel_clamped_progress;
    float pulse = sin(3.14159265 * p);
    float scale = 1.0 + 0.025 * pulse;
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}
