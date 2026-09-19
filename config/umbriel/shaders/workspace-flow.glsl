// workspace-flow.glsl — the whole view dips into a slight zoom-out + fade
// mid-switch while the strip slides underneath, then lands solid.
// Endpoints are exact so it resolves without a pop.
vec4 animation(vec2 uv) {
    float p = umbriel_clamped_progress;
    vec4 src = umbriel_sample(uv);
    if (p > 0.985) {
        return src;
    }
    float dip = sin(3.14159265 * p);
    float scale = 1.0 - 0.05 * dip;
    vec4 color = umbriel_sample((uv - 0.5) / scale + 0.5);
    float fade = 1.0 - 0.22 * dip;
    color.a *= fade;
    color.rgb *= fade;
    return mix(color, src, smoothstep(0.8, 1.0, p));
}
