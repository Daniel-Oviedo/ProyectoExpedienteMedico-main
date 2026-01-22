package com.manager.expedientemedico.service;

import com.manager.expedientemedico.dto.auth.LoginRequestDTO;
import com.manager.expedientemedico.dto.auth.LoginResponseDTO;
import com.manager.expedientemedico.model.Usuario;
import com.manager.expedientemedico.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        try {
            Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + dto.getEmail()));

            if (!passwordEncoder.matches(dto.getPassword(), usuario.getPassword())) {
                throw new RuntimeException("Contraseña incorrecta");
            }

            if (usuario.getRol() == null) {
                throw new RuntimeException("Usuario sin rol asignado");
            }

            String token = jwtService.generarToken(
                    usuario.getEmail(),
                    usuario.getRol().getNombre()
            );

            return new LoginResponseDTO(token);
        } catch (Exception ex) {
            throw new RuntimeException("Error en login: " + ex.getMessage(), ex);
        }
    }
}
