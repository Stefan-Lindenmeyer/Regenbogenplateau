```
/* TIME ANCHOR INTERFACE
 * Subsystem: External Chronal Reference Acquisition
 * Module ID: TAI-01
 * Scope: Anchor negotiation, validation, and continuous synchronization
 * Note: Temporal offsets are not stored locally
 */

ANCHOR_ENDPOINTS = [Ω1, Ω2, Ω3];
REFERENCE_FRAME  = LOCAL_PRESENT;

/* ─────────────────────────────
 * Anchor Discovery & Handshake
 * ───────────────────────────── */

ON_STARTUP {
    FOR EACH Ω IN ANCHOR_ENDPOINTS {
        emit_chronal_probe(
            frequency = f₀ · √(tooth_count / π),
            duration  = 1 gear-cycle
        );

        WAIT_FOR_RESPONSE(
            phase_tolerance < 10⁻⁶ rev,
            jitter_filter = KALMAN
        );

        IF response.invalid {
            mark Ω as UNSTABLE;
            reduce overlay_order;
        }
    }
}

/* ─────────────────────────────
 * Offset Request Protocol
 * ───────────────────────────── */

REQUEST_OFFSET(Ωi) {
    /* Offset is computed at the anchor, not here */
    send_query {
        parameters:
            local_epoch_signature,
            gravitational_baseline,
            alchemical_noise_floor
    };

    RECEIVE {
        Δt_i,                // signed temporal displacement
        anchor_mass_term,    // used for relativistic correction
        rune_entropy_index
    };

    ASSERT Δt_i ∉ memory_store;
}

/* ─────────────────────────────
 * Chronal Coupling Mathematics
 * ───────────────────────────── */

FOR EACH cycle n {
    Δt_vector(n) = [Δt₁, Δt₂, Δt₃];

    coupling_tensor C =
        |  1  -2   1 |
        | -2   5  -2 |
        |  1  -2   1 |;

    /* Solve for overlay phase without persisting offsets */
    overlay_phase φ(n) =
        C · (Δt_vector(n) / ||Δt_vector(n)||);

    stability_condition:
        dφ/dn < ε;
}

/* ─────────────────────────────
 * Mechanical Translation Layer
 * ───────────────────────────── */

MAP_TO_GEARS {
    FOR EACH Ωi {
        drive Helical_Input_Wheel[i]
            ratio = prime(teeth_i) : prime(teeth_core);

        apply micro-precession
            Δθ = φ(i) mod (1 / teeth_i);
    }
}

/* ─────────────────────────────
 * Error Handling & Drift Control
 * ───────────────────────────── */

IF anchor_entropy > threshold {
    increase sampling_rate;
    bias weighting toward remaining anchors;
}

IF one Ω LOST {
    maintain degraded dual-overlay
        with bounded divination leakage;
}

```