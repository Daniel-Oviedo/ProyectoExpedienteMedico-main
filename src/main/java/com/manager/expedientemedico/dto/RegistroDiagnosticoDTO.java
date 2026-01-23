package com.manager.expedientemedico.dto;

import lombok.Data;

@Data
public class RegistroDiagnosticoDTO {

    private Long expedienteId;
    private String diagnostico;
    private String medicamentos;
    private String observaciones;

}
