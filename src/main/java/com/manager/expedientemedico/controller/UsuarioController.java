package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.UsuarioRequestDTO;
import com.manager.expedientemedico.dto.UsuarioResponseDTO;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> crear(
            @RequestBody UsuarioRequestDTO dto
    ) {
        return ResponseEntity.ok(usuarioService.crear(dto));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @GetMapping("/perfil")
    public ResponseEntity<UsuarioResponseDTO> obtenerPerfil() {
        return ResponseEntity.ok(usuarioService.obtenerPerfil());
    }

}
