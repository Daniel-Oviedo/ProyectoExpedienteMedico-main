package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.PacienteRequestDTO;
import com.manager.expedientemedico.dto.PacienteResponseDTO;
import com.manager.expedientemedico.model.Paciente;
import com.manager.expedientemedico.service.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping
    public PacienteResponseDTO crear(@RequestBody PacienteRequestDTO dto) {
        return pacienteService.crear(dto);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listar() {
        return ResponseEntity.ok(pacienteService.listar());
    }

}
