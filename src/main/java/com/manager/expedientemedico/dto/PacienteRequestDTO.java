package com.manager.expedientemedico.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PacienteRequestDTO {

    private String nombre;
    private String identificacion;
    private LocalDate fechaNacimiento;
    private Long usuarioId;
}
