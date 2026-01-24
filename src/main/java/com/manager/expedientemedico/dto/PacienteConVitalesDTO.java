package com.manager.expedientemedico.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PacienteConVitalesDTO {
    private Long usuarioId;
    private LocalDate fechaNacimiento;
    private String presionArterial;
    private Double peso;
    private Double altura;
    private String observaciones;

}
