package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.ExpedienteRequestDTO;
import com.manager.expedientemedico.dto.ExpedienteResponseDTO;
import com.manager.expedientemedico.service.ExpedienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expedientes")
public class ExpedienteController {

    private final ExpedienteService expedienteService;

    public ExpedienteController(ExpedienteService expedienteService) {
        this.expedienteService = expedienteService;
    }

    @PostMapping
    public ResponseEntity<ExpedienteResponseDTO> crear(
            @RequestBody ExpedienteRequestDTO dto) {
        return ResponseEntity.ok(expedienteService.crear(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpedienteResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(expedienteService.buscarPorId(id));
    }


    @GetMapping
    public ResponseEntity<List<ExpedienteResponseDTO>> listar() {
        return ResponseEntity.ok(expedienteService.listar());
    }

    @GetMapping("/mio")
    public ResponseEntity<ExpedienteResponseDTO> obtenerExpedientePacienteAutenticado() {
        return ResponseEntity.ok(expedienteService.obtenerExpedientePacienteAutenticado());
    }

}
