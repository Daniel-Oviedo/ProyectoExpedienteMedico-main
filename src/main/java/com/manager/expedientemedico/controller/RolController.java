package com.manager.expedientemedico.controller;

import com.manager.expedientemedico.model.Rol;
import com.manager.expedientemedico.service.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public ResponseEntity<Rol> crear(@RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.guardar(rol));
    }

    @GetMapping
    public ResponseEntity<List<Rol>> listar() {
        return ResponseEntity.ok(rolService.listar());
    }

}
