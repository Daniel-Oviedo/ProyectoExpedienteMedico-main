package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.PacienteRequestDTO;
import com.manager.expedientemedico.dto.PacienteResponseDTO;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import com.manager.expedientemedico.model.Paciente;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.repository.PacienteRepository;
import com.manager.expedientemedico.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    public PacienteService(PacienteRepository pacienteRepository,
                           UsuarioRepository usuarioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public PacienteResponseDTO crear(PacienteRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        Paciente paciente = new Paciente();
        paciente.setNombre(dto.getNombre());
        paciente.setIdentificacion(dto.getIdentificacion());
        paciente.setFechaNacimiento(dto.getFechaNacimiento());
        paciente.setUsuario(usuario);

        Paciente guardado = pacienteRepository.save(paciente);

        PacienteResponseDTO response = new PacienteResponseDTO();
        response.setId(guardado.getId());
        response.setNombre(guardado.getNombre());
        response.setIdentificacion(guardado.getIdentificacion());
        response.setFechaNacimiento(guardado.getFechaNacimiento());
        response.setUsuarioId(guardado.getUsuario().getId());

        return response;
    }

    public List<Paciente> listar() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

}
