package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.dto.RegistroMedicoRequestDTO;
import com.manager.expedientemedico.dto.RegistroMedicoResponseDTO;
import com.manager.expedientemedico.service.RegistroMedicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros-medicos")
public class RegistroMedicoController {

    private final RegistroMedicoService registroService;

    public RegistroMedicoController(RegistroMedicoService registroService) {
        this.registroService = registroService;
    }

    @PostMapping
    public ResponseEntity<RegistroMedicoResponseDTO> crear(
            @RequestBody RegistroMedicoRequestDTO dto) {
        return ResponseEntity.ok(registroService.crear(dto));
    }

    @GetMapping("/expediente/{id}")
    public List<RegistroMedicoResponseDTO> listarPorExpediente(@PathVariable Long id) {
        return registroService.listarPorExpediente(id);
    }

}
