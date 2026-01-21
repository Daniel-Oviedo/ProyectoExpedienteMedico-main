package com.manager.expedientemedico.dto;

import lombok.Data;

@Data
public class UsuarioRequestDTO {

    private String nombre;
    private String email;
    private String password;
    private Long rolId;

}
