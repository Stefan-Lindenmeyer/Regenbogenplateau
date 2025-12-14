```
/* ABJURATION SUPPRESSION SHELL
 * Subsystem: Local Weave Topology Control
 * Module ID: ABS-02
 * Scope: Castle and Cavern-Volume Abjuration Attenuation
 */

PROTECTED_VOLUME {
    inner_boundary = CASTLE_STRUCTURE;
    outer_boundary = CAVERN_ENVELOPE;
    falloff_model  = QUADRATIC;
}

MAGIC_CLASS_FILTER = ABJURATION;

/* ─────────────────────────────
 * Field Geometry Definition
 * ───────────────────────────── */

DEFINE_FIELD {
    basis_vectors = [
        ∇×A,          // rotational weave component
        ∇·A,          // compressive weave component
        ∂A/∂t         // temporal shear
    ];

    shell_tensor S(x) =
        α(∇×∇×A) − β(∇·∇A) + γ(∂²A/∂t²);

    coefficients [α, β, γ] solved per anchor cycle
}

/* ─────────────────────────────
 * Inverted Abjuration Logic
 * ───────────────────────────── */

ON_SPELL_INTERACTION(spell) {
    IF spell.school == ABJURATION {
        classify origin;

        IF origin == EXTERNAL {
            apply attenuation:
                strength_out = strength_in · e^(−λ·path_length);

            inject phase_noise
                σ = function(Δt_vector);

            return WEAVE_DECORRELATED;
        }

        IF origin == INTERNAL {
            route via privileged manifold;
            apply phase_alignment with φ(n);
            return UNMODIFIED;
        }
    }
}

/* ─────────────────────────────
 * Temporal Averaging & Stability
 * ───────────────────────────── */

FOR EACH anchor_cycle n {
    shell_state(n) =
        (1/3) · Σ shell_state(n, Ωi);

    ensure continuity:
        |shell_state(n) − shell_state(n−1)| < δ;
}

/* ─────────────────────────────
 * Mechanical–Arcane Actuation
 * ───────────────────────────── */

MAP_FIELD_TO_MECHANISM {
    Weaver_Rings[3] synchronized to Ω1..Ω3;
    torsion_load ∝ ∫ shell_tensor dV;

    IF torsion_load > SAFE_LIMIT {
        bleed excess into inert damping gears;
    }
}

/* ─────────────────────────────
 * Failure & Degradation Modes
 * ───────────────────────────── */

IF abjuration_pressure > capacity {
    shell enters DIFFUSIVE_MODE;
    leaks manifest as harmless auroral effects;
}

IF anchor desync detected {
    local null-zones may appear temporarily;
}


```