package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.RegistroMedicoRequestDTO;
import com.manager.expedientemedico.dto.RegistroMedicoResponseDTO;
import com.manager.expedientemedico.exception.OperacionNoPermitidaException;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import com.manager.expedientemedico.model.Expediente;
import com.manager.expedientemedico.model.RegistroMedico;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.repository.ExpedienteRepository;
import com.manager.expedientemedico.repository.RegistroMedicoRepository;
import com.manager.expedientemedico.repository.UsuarioRepository;
import com.manager.expedientemedico.security.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroMedicoService {

    private final RegistroMedicoRepository registroRepository;
    private final ExpedienteRepository expedienteRepository;
    private final UsuarioRepository usuarioRepository;

    public RegistroMedicoService(
            RegistroMedicoRepository registroRepository,
            ExpedienteRepository expedienteRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.registroRepository = registroRepository;
        this.expedienteRepository = expedienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public RegistroMedicoResponseDTO crear(RegistroMedicoRequestDTO dto) {

        Expediente expediente = expedienteRepository.findById(dto.getExpedienteId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Expediente no encontrado"));

        String email = SecurityUtils.getEmailUsuarioActual();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Usuario autenticado no encontrado"));

        String rol = SecurityUtils.getRolUsuarioActual();

        // 🚫 PACIENTE
        if (rol.equals("ROLE_PACIENTE")) {
            throw new OperacionNoPermitidaException(
                    "El paciente no puede crear registros médicos"
            );
        }

        RegistroMedico registro = new RegistroMedico();
        registro.setExpediente(expediente);
        registro.setUsuario(usuario);
        registro.setObservaciones(dto.getObservaciones());

        // 🩺 ENFERMERA
        if (rol.equals("ROLE_ENFERMERA")) {

            registro.setPresionArterial(dto.getPresionArterial());
            registro.setPeso(dto.getPeso());
            registro.setAltura(dto.getAltura());

            registro.setDiagnostico(null);
            registro.setMedicamentos(null);
        }

        // 👩‍⚕️ MÉDICA
        else if (rol.equals("ROLE_MEDICA")) {

            registro.setDiagnostico(dto.getDiagnostico());
            registro.setMedicamentos(dto.getMedicamentos());

            registro.setPresionArterial(null);
            registro.setPeso(null);
            registro.setAltura(null);
        }

        RegistroMedico guardado = registroRepository.save(registro);

        RegistroMedicoResponseDTO response = new RegistroMedicoResponseDTO();
        response.setId(guardado.getId());
        response.setFechaRegistro(guardado.getFechaRegistro());
        response.setObservaciones(guardado.getObservaciones());
        response.setDiagnostico(guardado.getDiagnostico());
        response.setMedicamentos(guardado.getMedicamentos());
        response.setPresionArterial(guardado.getPresionArterial());
        response.setPeso(guardado.getPeso());
        response.setAltura(guardado.getAltura());
        response.setExpedienteId(expediente.getId());
        response.setUsuarioId(usuario.getId());

        return response;
    }

    public List<RegistroMedicoResponseDTO> listarPorExpediente(Long expedienteId) {

        return registroRepository.findByExpedienteId(expedienteId)
                .stream()
                .map(registro -> {
                    RegistroMedicoResponseDTO dto = new RegistroMedicoResponseDTO();
                    dto.setId(registro.getId());
                    dto.setFechaRegistro(registro.getFechaRegistro());
                    dto.setObservaciones(registro.getObservaciones());
                    dto.setDiagnostico(registro.getDiagnostico());
                    dto.setMedicamentos(registro.getMedicamentos());
                    dto.setPresionArterial(registro.getPresionArterial());
                    dto.setPeso(registro.getPeso());
                    dto.setAltura(registro.getAltura());
                    dto.setExpedienteId(registro.getExpediente().getId());
                    dto.setUsuarioId(registro.getUsuario().getId());
                    return dto;
                })
                .toList();
    }
}