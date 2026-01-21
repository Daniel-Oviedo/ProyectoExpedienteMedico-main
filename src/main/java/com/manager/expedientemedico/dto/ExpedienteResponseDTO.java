package com.manager.expedientemedico.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExpedienteResponseDTO {
    private Long id;
    private LocalDateTime fechaCreacion;
    private String estado;
    private Long pacienteId;
}
