package com.manager.expedientemedico.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PacienteConVitalesDTO {

    // Identificación del usuario existente
    private Long usuarioId;

    // Datos del paciente
    private LocalDate fechaNacimiento;

    // Signos vitales (enfermería)
    private String presionArterial;
    private Double peso;
    private Double altura;
    private String observaciones;

}
