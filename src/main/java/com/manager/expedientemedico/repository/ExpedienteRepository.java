package com.manager.expedientemedico.repository;

import com.manager.expedientemedico.model.Expediente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {
    Optional<Expediente> findByPacienteId(Long pacienteId);
}
