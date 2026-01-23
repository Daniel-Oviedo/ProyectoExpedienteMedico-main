package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.ExpedienteRequestDTO;
import com.manager.expedientemedico.dto.ExpedienteResponseDTO;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import com.manager.expedientemedico.model.Expediente;
import com.manager.expedientemedico.model.Paciente;
import com.manager.expedientemedico.repository.ExpedienteRepository;
import com.manager.expedientemedico.repository.PacienteRepository;
import com.manager.expedientemedico.repository.UsuarioRepository;
import com.manager.expedientemedico.security.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ExpedienteService {

    private final ExpedienteRepository expedienteRepository;
    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    public ExpedienteService(ExpedienteRepository expedienteRepository,
                             PacienteRepository pacienteRepository,
                             UsuarioRepository usuarioRepository) {
        this.expedienteRepository = expedienteRepository;
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public ExpedienteResponseDTO crear(ExpedienteRequestDTO dto) {

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado"));

        Expediente expediente = new Expediente();
        expediente.setPaciente(paciente);
        expediente.setEstado("ACTIVO");

        Expediente guardado = expedienteRepository.save(expediente);

        ExpedienteResponseDTO response = new ExpedienteResponseDTO();
        response.setId(guardado.getId());
        response.setFechaCreacion(guardado.getFechaCreacion());
        response.setEstado(guardado.getEstado());
        response.setPacienteId(paciente.getId());

        return response;
    }

    public ExpedienteResponseDTO buscarPorId(Long id) {

        Expediente expediente = expedienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Expediente no encontrado"));

        ExpedienteResponseDTO dto = new ExpedienteResponseDTO();
        dto.setId(expediente.getId());
        dto.setFechaCreacion(expediente.getFechaCreacion());
        dto.setEstado(expediente.getEstado());
        dto.setPacienteId(expediente.getPaciente().getId());

        return dto;
    }


    public List<ExpedienteResponseDTO> listar() {

        return expedienteRepository.findAll()
                .stream()
                .map(expediente -> {
                    ExpedienteResponseDTO dto = new ExpedienteResponseDTO();
                    dto.setId(expediente.getId());
                    dto.setFechaCreacion(expediente.getFechaCreacion());
                    dto.setEstado(expediente.getEstado());
                    dto.setPacienteId(expediente.getPaciente().getId());
                    return dto;
                })
                .toList();
    }

    public ExpedienteResponseDTO obtenerExpedientePacienteAutenticado() {
        String email = SecurityUtils.getEmailUsuarioActual();
        
        // Obtener usuario autenticado
        var usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Usuario autenticado no encontrado: " + email
                ));
        
        // Obtener paciente asociado al usuario
        var pacienteOpt = pacienteRepository.findByUsuarioId(usuario.getId());
        
        if (pacienteOpt.isEmpty()) {
            throw new RecursoNoEncontradoException(
                    "No hay un perfil de paciente asociado al usuario. Será creado cuando la enfermera te registre."
            );
        }
        
        Paciente paciente = pacienteOpt.get();
        
        // Obtener expediente del paciente
        var expedienteOpt = expedienteRepository.findByPacienteId(paciente.getId());
        
        if (expedienteOpt.isEmpty()) {
            throw new RecursoNoEncontradoException(
                    "El paciente no tiene un expediente médico registrado. Será creado cuando la enfermera te registre."
            );
        }
        
        Expediente expediente = expedienteOpt.get();
        
        ExpedienteResponseDTO dto = new ExpedienteResponseDTO();
        dto.setId(expediente.getId());
        dto.setFechaCreacion(expediente.getFechaCreacion());
        dto.setEstado(expediente.getEstado());
        dto.setPacienteId(expediente.getPaciente().getId());
        dto.setPaciente(expediente.getPaciente());
        
        return dto;
    }

    public ExpedienteResponseDTO obtenerPorPacienteId(Long pacienteId) {
        
        Expediente expediente = expedienteRepository.findByPacienteId(pacienteId)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Expediente no encontrado para el paciente"
                ));
        
        ExpedienteResponseDTO dto = new ExpedienteResponseDTO();
        dto.setId(expediente.getId());
        dto.setFechaCreacion(expediente.getFechaCreacion());
        dto.setEstado(expediente.getEstado());
        dto.setPacienteId(expediente.getPaciente().getId());
        dto.setPaciente(expediente.getPaciente());
        
        return dto;
    }
}
