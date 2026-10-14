// border-pulse.glsl — pulse the focus border color during focus changes.
// Example from the Umbriel animation docs:
// https://docs.noctalia.dev/umbriel/animation/ (Custom GLSL shaders)
vec4 animation(vec2 uv) {
    vec4 color = umbriel_sample(uv);
    float pulse = 0.3 * sin(3.14159265 * umbriel_clamped_progress);
    vec3 highlight = vec3(1.0, 0.4, 0.1) * color.a;
    return vec4(mix(color.rgb, highlight, pulse), color.a);
}
