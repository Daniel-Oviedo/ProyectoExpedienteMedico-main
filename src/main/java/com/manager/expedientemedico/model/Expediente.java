package com.manager.expedientemedico.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "expedientes")
public class Expediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(nullable = false)
    private String estado;

    @OneToOne
    @JoinColumn(
            name = "paciente_id",
            nullable = false,
            unique = true
    )
    private Paciente paciente;

    @OneToMany(mappedBy = "expediente", cascade = CascadeType.ALL)
    private List<RegistroMedico> registros = new ArrayList<>();

}
