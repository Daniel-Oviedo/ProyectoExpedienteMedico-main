package com.manager.expedientemedico.model;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "registros_medicos")

public class RegistroMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // QUIÉN creó el registro (médico o enfermera)
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // A QUÉ expediente pertenece
    @ManyToOne
    @JoinColumn(name = "expediente_id", nullable = false)
    private Expediente expediente;

    // DATOS MÉDICOS
    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @Column(columnDefinition = "TEXT")
    private String diagnostico;

    @Column(columnDefinition = "TEXT")
    private String medicamentos;

    // SIGNOS VITALES (enfermería)
    private String presionArterial;
    private Double peso;
    private Double altura;

    private LocalDateTime fechaRegistro = LocalDateTime.now();

}
