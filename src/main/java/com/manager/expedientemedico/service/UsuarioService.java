package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.UsuarioRequestDTO;
import com.manager.expedientemedico.dto.UsuarioResponseDTO;
import com.manager.expedientemedico.exception.RecursoNoEncontradoException;
import com.manager.expedientemedico.model.Rol;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.repository.RolRepository;
import com.manager.expedientemedico.repository.UsuarioRepository;
import com.manager.expedientemedico.security.SecurityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO crear(UsuarioRequestDTO dto) {

        Rol rol = rolRepository.findById(dto.getRolId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );
        usuario.setRol(rol);

        Usuario guardado = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(
                guardado.getId(),
                guardado.getNombre(),
                guardado.getEmail(),
                guardado.getRol().getNombre()
        );
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    public UsuarioResponseDTO obtenerPerfil() {
        String email = SecurityUtils.getEmailUsuarioActual();
        
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "No se encontró el perfil del usuario: " + email
                ));
        
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol().getNombre()
        );
    }}
