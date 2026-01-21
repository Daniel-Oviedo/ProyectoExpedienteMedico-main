package com.manager.expedientemedico.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroMedicoRequestDTO {

    private Long expedienteId;


    private String observaciones;
    private String diagnostico;
    private String medicamentos;

    private String presionArterial;
    private Double peso;
    private Double altura;
}
