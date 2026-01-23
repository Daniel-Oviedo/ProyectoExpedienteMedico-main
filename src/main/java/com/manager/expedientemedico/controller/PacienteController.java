package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.PacienteRequestDTO;
import com.manager.expedientemedico.dto.PacienteResponseDTO;
import com.manager.expedientemedico.dto.PacienteConVitalesDTO;
import com.manager.expedientemedico.dto.UsuarioResponseDTO;
import com.manager.expedientemedico.model.Paciente;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.service.PacienteService;
import com.manager.expedientemedico.repository.UsuarioRepository;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;
    private final UsuarioRepository usuarioRepository;

    public PacienteController(PacienteService pacienteService,
                             UsuarioRepository usuarioRepository) {
        this.pacienteService = pacienteService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public PacienteResponseDTO crear(@RequestBody PacienteRequestDTO dto) {
        return pacienteService.crear(dto);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listar() {
        return ResponseEntity.ok(pacienteService.listar());
    }

    @GetMapping("/sin-diagnostico")
    @PreAuthorize("hasRole('MEDICA')")
    public ResponseEntity<List<Paciente>> listarSinDiagnostico() {
        return ResponseEntity.ok(pacienteService.listarSinDiagnostico());
    }

    @GetMapping("/buscar")
    public ResponseEntity<UsuarioResponseDTO> buscarPorCedula(@RequestParam String cedula) {
        Usuario usuario = usuarioRepository.findByIdentificacion(cedula)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario con cédula " + cedula + " no encontrado"));
        
        UsuarioResponseDTO response = new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol().getNombre()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/registrar-con-vitales")
    @PreAuthorize("hasRole('ENFERMERA')")
    public ResponseEntity<PacienteResponseDTO> registrarPacienteConVitales(
            @RequestBody PacienteConVitalesDTO dto) {
        return ResponseEntity.ok(pacienteService.registrarPacienteConVitales(dto));
    }

}

