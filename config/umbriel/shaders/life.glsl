// life.glsl — by samiser (github.com/samiser/umbriel-shaders).
// Conway's Game of Life (HighLife variant half the time) played on the
// window's own alpha, with each live cell showing the window's pixels.
// Uses umbriel_sample_previous feedback for the simulation state and
// umbriel_random_seed for the variant + hash. Saved verbatim: it is
// written as a CLOSE effect (fades to nothing by progress 1, which is
// exactly right for windows_out).
const float CELL_PX = 3.0;
const float FADE_START = 0.5;

float fade() {
    return 1.0 - smoothstep(FADE_START, 1.0, umbriel_linear_progress);
}

float hash(vec2 p) {
    p = fract(p * vec2(443.897, 441.423) + umbriel_random_seed.xy);
    p += dot(p, p.yx + 19.19);
    return fract(p.x * p.y);
}

float alive(vec2 q) {
    float a = umbriel_sample(q).a * max(fade(), 0.05);
    return a > 0.002 && umbriel_sample_previous(q).a > 0.5 * a ? 1.0 : 0.0;
}

vec4 animation(vec2 uv) {
    vec4 src = umbriel_sample(uv);
    vec2 cell = CELL_PX / umbriel_size;
    vec2 id = floor(uv / cell);
    vec2 q = (id + 0.5) * cell;

    float n = 0.0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            n += alive(q + vec2(float(i), float(j)) * cell);
        }
    }
    float me = alive(q);
    n -= me;

    float state;
    if (me > 0.5 && n == 8.0) {
        vec4 centre = umbriel_sample(q);
        float lum = dot(centre.rgb, vec3(0.299, 0.587, 0.114));
        state = hash(id) < mix(0.25, 0.45, lum) ? 1.0 : 0.0;
    } else {
        bool highlife = umbriel_random_seed.z > 0.5;
        bool birth = n == 3.0 || (highlife && n == 6.0);
        bool survive = n == 2.0 || n == 3.0;
        state = me > 0.5 ? (survive ? 1.0 : 0.0) : (birth ? 1.0 : 0.0);
    }

    return src * state * fade();
}
