// drop-bounce.glsl — window falls in from the top and bounces to rest.
// Progress uses the clamped timeline so spring-curve overshoot can't disturb it.
vec4 animation(vec2 uv) {
    float p = umbriel_clamped_progress;
    vec4 src = umbriel_sample(uv);
    if (p > 0.985) {
        return src;
    }
    float r = 1.0 - p;
    // Fall: fast at first, easing into place.
    float fall = r * r * 0.85;
    // Two decaying bounces on the way down.
    float bounce = abs(sin(p * 9.0)) * r * r * 0.10;
    float yOff = fall - bounce;
    vec4 color = umbriel_sample(vec2(uv.x, uv.y + yOff));
    float enter = smoothstep(0.0, 0.08, p);
    color.a *= enter;
    color.rgb *= enter;
    return mix(color, src, smoothstep(0.75, 1.0, p));
}
