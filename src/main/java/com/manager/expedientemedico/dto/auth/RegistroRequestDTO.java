package com.manager.expedientemedico.dto.auth;

import lombok.Data;

@Data
public class RegistroRequestDTO {

    private String cedula;
    private String nombre;
    private String email;
    private String password;
    private Long rolId;

}
