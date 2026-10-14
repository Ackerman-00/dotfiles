// lottery.glsl — a random open animation every time.
// umbriel_random_seed picks one of three calm effects per transition:
//   0 = reveal (wipe), 1 = poof (breathe), 2 = settle (gentle overshoot).
// Removed for flicker/flash: holes (punched alpha across the window),
// bloom (near-zero scale = out-of-bounds transparent shimmer),
// watr (zeroed alpha below the surface line = big backdrop flash),
// spiral (additive rim glow blows out + alpha mask). None of the kept
// effects touch alpha, so opens never flash the backdrop.
// Shared fade-in and clean resolve envelope so endpoints never pop.

// --- effect 0: reveal (left-to-right wipe, bundled style) ---
vec4 fx_reveal(vec2 uv, float visible) {
    float edge = mix(-0.02, 1.02, visible);
    float mask = 1.0 - smoothstep(edge - 0.02, edge + 0.02, uv.x);
    return umbriel_sample(uv) * mask;
}

// --- effect 1: poof (gentle breathe, no flash, no transparency) ---
vec4 fx_poof(vec2 uv, float p) {
    float pulse = sin(3.14159265 * p);
    float scale = 1.0 + 0.08 * pulse;
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}

// --- effect 2: settle (gentle overshoot) ---
vec4 fx_settle(vec2 uv, float p) {
    float pulse = sin(3.14159265 * p);
    float scale = 1.0 + 0.025 * pulse;
    return umbriel_sample((uv - 0.5) / scale + 0.5);
}

vec4 animation(vec2 uv) {
    float p = umbriel_linear_progress;
    vec4 src = umbriel_sample(uv);
    if (p > 0.985) {
        return src;
    }

    float amount = umbriel_direction > 0.0
        ? umbriel_clamped_progress : 1.0 - umbriel_clamped_progress;

    // Hash all 4 seed channels + window size to avoid streaks when seed.x alone clusters.
    // Docs: umbriel_random_seed is 4x [0,1) stable per transition, refreshed next transition.
    float rnd = fract(sin(dot(umbriel_random_seed.xy, vec2(12.9898, 78.233)) + dot(umbriel_random_seed.zw, vec2(34.56, 19.19))) * 43758.5453);
    rnd = fract(rnd + fract(umbriel_size.x * 0.0031 + umbriel_size.y * 0.0073));
    int pick = int(floor(rnd * 3.0));
    vec4 fx;
    if (pick == 0) {
        fx = fx_reveal(uv, amount);
    } else if (pick == 1) {
        fx = fx_poof(uv, p);
    } else {
        fx = fx_settle(uv, p);
    }

    float enter = smoothstep(0.0, 0.08, p);
    fx.a *= enter;
    fx.rgb *= enter;
    return mix(fx, src, smoothstep(0.6, 1.0, p));
}
