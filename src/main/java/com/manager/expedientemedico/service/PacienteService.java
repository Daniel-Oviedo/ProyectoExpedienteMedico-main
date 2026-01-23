package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.PacienteRequestDTO;
import com.manager.expedientemedico.dto.PacienteResponseDTO;
import com.manager.expedientemedico.dto.PacienteConVitalesDTO;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import com.manager.expedientemedico.model.Paciente;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.model.Expediente;
import com.manager.expedientemedico.model.RegistroMedico;
import com.manager.expedientemedico.repository.PacienteRepository;
import com.manager.expedientemedico.repository.UsuarioRepository;
import com.manager.expedientemedico.repository.ExpedienteRepository;
import com.manager.expedientemedico.repository.RegistroMedicoRepository;
import com.manager.expedientemedico.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final ExpedienteRepository expedienteRepository;
    private final RegistroMedicoRepository registroMedicoRepository;

    public PacienteService(PacienteRepository pacienteRepository,
                           UsuarioRepository usuarioRepository,
                           ExpedienteRepository expedienteRepository,
                           RegistroMedicoRepository registroMedicoRepository) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.expedienteRepository = expedienteRepository;
        this.registroMedicoRepository = registroMedicoRepository;
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

    @Transactional
    public PacienteResponseDTO registrarPacienteConVitales(PacienteConVitalesDTO dto) {
        
        // 1. Buscar usuario
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        // 2. Crear Paciente
        Paciente paciente = new Paciente();
        paciente.setNombre(usuario.getNombre());
        paciente.setIdentificacion(usuario.getIdentificacion());
        paciente.setFechaNacimiento(dto.getFechaNacimiento());
        paciente.setUsuario(usuario);
        
        Paciente pacienteGuardado = pacienteRepository.save(paciente);

        // 3. Crear Expediente
        Expediente expediente = new Expediente();
        expediente.setPaciente(pacienteGuardado);
        expediente.setEstado("ACTIVO");
        
        Expediente expedienteGuardado = expedienteRepository.save(expediente);

        // 4. Crear Registro Médico con signos vitales (creado por la enfermera actual)
        String emailEnfermera = SecurityUtils.getEmailUsuarioActual();
        Usuario enfermera = usuarioRepository.findByEmail(emailEnfermera)
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermera no encontrada"));

        RegistroMedico registro = new RegistroMedico();
        registro.setExpediente(expedienteGuardado);
        registro.setUsuario(enfermera);
        registro.setPresionArterial(dto.getPresionArterial());
        registro.setPeso(dto.getPeso());
        registro.setAltura(dto.getAltura());
        registro.setObservaciones(dto.getObservaciones());
        
        registroMedicoRepository.save(registro);

        // 5. Retornar respuesta
        PacienteResponseDTO response = new PacienteResponseDTO();
        response.setId(pacienteGuardado.getId());
        response.setNombre(pacienteGuardado.getNombre());
        response.setIdentificacion(pacienteGuardado.getIdentificacion());
        response.setFechaNacimiento(pacienteGuardado.getFechaNacimiento());
        response.setUsuarioId(pacienteGuardado.getUsuario().getId());

        return response;
    }

}
