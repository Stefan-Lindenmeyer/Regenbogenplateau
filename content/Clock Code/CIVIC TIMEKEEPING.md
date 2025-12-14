```
/* CIVIC TIMEKEEPING
 * Subsystem: Public Temporal Reference
 * Module ID: CTK-05
 * Scope: Time display and hourly acoustic signal
 * Note: Minor chronal instability observed under full anchor overlay
 */

TIME_DOMAIN = LOCAL_PRESENT;
AUDIBLE_RANGE = CASTLE + INNER_CAVERN;

/* ─────────────────────────────
 * Time Basis Selection
 * ───────────────────────────── */

SELECT_TIME_SOURCE {
    primary   = Ω2;
    secondary = mean(Ω1, Ω3);

	/* Compensation for anchor overlay */
    anchor_reference = Ω1.timescale * (Reference[1]) + Ω2.timescale + Ω3.timescale * (Reference[1])
    effective_time t_eff =
        t · (1 / N_active_anchors) * anchor_reference;

    apply relativistic correction:
        t_ref = t_eff · (1 − Φ/c²);
    
    /* calculate day length */
    day_duration = 24 / anchor_reference
}

/* ─────────────────────────────
 * Mechanical Time Integration
 * ───────────────────────────── */

INTEGRATE_TIME {
    escapement = Isochron Verge;
    step_size  = 1 second;

    angular_velocity ω =
        dθ/dt = 2π / (SIDEREAL_DAY);

    /* Redundant integration paths */
    integrate ω over [Ω1, Ω2, Ω3];
    project result onto present dial;
}

/* ─────────────────────────────
 * Dial Projection & Filtering
 * ───────────────────────────── */

UPDATE_DIAL {
	
    filtered_time =
        clamp(t_ref, monotonic);

    hour_hand   = floor(filtered_time / 3600);
    minute_hand = floor((filtered_time mod 3600) / 60);
    
}

/* ─────────────────────────────
 * Hourly Signal Generation
 * ───────────────────────────── */

ON_HOUR {
    /* Hour boundary detected in all three integrations */
    IF hour_crossed(Ω1) AND
       hour_crossed(Ω2) AND
       hour_crossed(Ω3) {

        bell_count = hour_hand;
        trigger striker;
    }
}

```