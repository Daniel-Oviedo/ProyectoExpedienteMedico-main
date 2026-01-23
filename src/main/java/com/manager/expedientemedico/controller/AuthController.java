package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.auth.LoginRequestDTO;
import com.manager.expedientemedico.dto.auth.LoginResponseDTO;
import com.manager.expedientemedico.dto.auth.RegistroRequestDTO;
import com.manager.expedientemedico.dto.UsuarioResponseDTO;
import com.manager.expedientemedico.service.AuthService;
import com.manager.expedientemedico.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService, UsuarioService usuarioService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/registro")
    public ResponseEntity<UsuarioResponseDTO> registro(
            @RequestBody RegistroRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.registroPublico(dto));
    }
}
