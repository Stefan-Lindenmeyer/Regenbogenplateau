```
/* CAVERN SKY PROJECTION
 * Subsystem: Remote Astral–Optical Rendering
 * Module ID: CSP-04
 * Scope: Passive environmental projection only
 */

PROJECTION_DOMAIN {
    source_altitude = ABOVE_CLOUD_LAYER;
    target_surface  = CAVERN_CEILING;
    coverage_angle  = 162°;
}

RENDER_PRIORITY = LOW;

/* ─────────────────────────────
 * Sky Sampling Interface
 * ───────────────────────────── */

ACQUIRE_SKY_STATE {
    input_channels = [
        stellar_luminance,
        atmospheric scatter index,
        astral phase residue
    ];

    sampling_interval =
        sidereal_second / gcd(Ω1, Ω2, Ω3);

    normalize against local cavern light;
}

/* ─────────────────────────────
 * Spatial Transformation
 * ───────────────────────────── */

MAP_SKY_TO_SURFACE {
    /* Non-Euclidean correction for cavern geometry */
    solve Laplace(surface_potential) = 0;

    mapping_function f:
        S² (celestial) → Σ (cavern ceiling);

    enforce continuity across projection seams;
}

/* ─────────────────────────────
 * Temporal Coherence
 * ───────────────────────────── */

FOR EACH render cycle n {
    sky_time(n) =
        weighted_mean(Ω1, Ω2, Ω3);

    ensure |d(sky_time)/dn| < visual_threshold;
}

/* ─────────────────────────────
 * Optical–Arcane Actuation
 * ───────────────────────────── */

PROJECT {
    modulate luminance via crystal lenses;
    phase-lock emission to present anchor;
    bleed excess astral energy to dampers;
}

/* ─────────────────────────────
 * Degradation & Safeguards
 * ───────────────────────────── */

IF anchor instability detected {
    reduce resolution;
    freeze star positions;
}

IF power draw exceeds quota {
    suspend projection first;
}

```