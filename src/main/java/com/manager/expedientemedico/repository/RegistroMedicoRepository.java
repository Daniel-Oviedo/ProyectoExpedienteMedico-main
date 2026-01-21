package com.manager.expedientemedico.repository;

import com.manager.expedientemedico.model.RegistroMedico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistroMedicoRepository extends JpaRepository<RegistroMedico, Long> {
    List<RegistroMedico> findByExpedienteId(Long expedienteId);
}
