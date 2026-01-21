package com.manager.expedientemedico.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RegistroMedicoResponseDTO {

    private Long id;
    private LocalDateTime fechaRegistro;

    private String observaciones;
    private String diagnostico;
    private String medicamentos;

    private String presionArterial;
    private Double peso;
    private Double altura;

    private Long expedienteId;
    private Long usuarioId;
}
