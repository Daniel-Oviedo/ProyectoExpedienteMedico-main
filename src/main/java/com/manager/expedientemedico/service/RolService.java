package com.manager.expedientemedico.service;


import com.manager.expedientemedico.model.Rol;
import com.manager.expedientemedico.repository.RolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public Optional<Rol> buscarPorNombre(String nombre) {
        return rolRepository.findByNombre(nombre);
    }

    public Optional<Rol> buscarPorId(Long id) {
        return rolRepository.findById(id);
    }

    public List<Rol> listar() {
        return rolRepository.findAll();
    }

    public Rol guardar(Rol rol) {
        return rolRepository.save(rol);
    }
}
