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

    public List<Paciente> listarSinDiagnostico() {
        List<Paciente> todos = pacienteRepository.findAll();
        return todos.stream().filter(paciente -> {
            Optional<Expediente> expediente = expedienteRepository.findByPacienteId(paciente.getId());
            if (expediente.isPresent()) {
                List<RegistroMedico> registros = registroMedicoRepository.findByExpedienteId(expediente.get().getId());
                // Si tiene registros y alguno tiene diagnóstico, filtrar
                return registros.stream().noneMatch(r -> r.getDiagnostico() != null && !r.getDiagnostico().isEmpty());
            }
            return true; // Si no tiene expediente, mostrar
        }).toList();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    @Transactional
    public PacienteResponseDTO registrarPacienteConVitales(PacienteConVitalesDTO dto) {
        
        // 1. Buscar usuario
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        // 2. Verificar si ya existe un Paciente para este usuario
        Paciente paciente = pacienteRepository.findByUsuarioId(usuario.getId())
                .orElseGet(() -> {
                    // Si no existe, crear uno nuevo
                    Paciente nuevoPaciente = new Paciente();
                    nuevoPaciente.setNombre(usuario.getNombre());
                    nuevoPaciente.setIdentificacion(usuario.getIdentificacion());
                    nuevoPaciente.setFechaNacimiento(dto.getFechaNacimiento());
                    nuevoPaciente.setUsuario(usuario);
                    return pacienteRepository.save(nuevoPaciente);
                });

        // 3. Actualizar fecha de nacimiento si se proporcionó
        if (dto.getFechaNacimiento() != null) {
            paciente.setFechaNacimiento(dto.getFechaNacimiento());
            paciente = pacienteRepository.save(paciente);
        }

        // 4. Verificar si ya existe un Expediente para este paciente
        final Paciente pacienteFinal = paciente;
        Expediente expediente = expedienteRepository.findByPacienteId(pacienteFinal.getId())
                .orElseGet(() -> {
                    // Si no existe, crear uno nuevo
                    Expediente nuevoExpediente = new Expediente();
                    nuevoExpediente.setPaciente(pacienteFinal);
                    nuevoExpediente.setEstado("ACTIVO");
                    return expedienteRepository.save(nuevoExpediente);
                });

        // 5. Crear Registro Médico con signos vitales (creado por la enfermera actual)
        String emailEnfermera = SecurityUtils.getEmailUsuarioActual();
        Usuario enfermera = usuarioRepository.findByEmail(emailEnfermera)
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermera no encontrada"));

        RegistroMedico registro = new RegistroMedico();
        registro.setExpediente(expediente);
        registro.setUsuario(enfermera);
        registro.setPresionArterial(dto.getPresionArterial());
        registro.setPeso(dto.getPeso());
        registro.setAltura(dto.getAltura());
        registro.setObservaciones(dto.getObservaciones());
        
        registroMedicoRepository.save(registro);

        // 6. Retornar respuesta
        PacienteResponseDTO response = new PacienteResponseDTO();
        response.setId(paciente.getId());
        response.setNombre(paciente.getNombre());
        response.setIdentificacion(paciente.getIdentificacion());
        response.setFechaNacimiento(paciente.getFechaNacimiento());
        response.setUsuarioId(paciente.getUsuario().getId());

        return response;
    }

}
