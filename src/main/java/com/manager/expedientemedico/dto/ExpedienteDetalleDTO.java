package com.manager.expedientemedico.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ExpedienteDetalleDTO {

    private Long id;
    private Long pacienteId;
    private String pacienteNombre;
    private String estado;
    private LocalDateTime fechaCreacion;
    private boolean tieneDiagnostico;

}
