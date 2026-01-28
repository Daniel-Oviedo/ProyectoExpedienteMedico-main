-- Desactivar restricciones de clave foránea
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar TODAS las tablas en orden correcto (relaciones primero)
DELETE FROM expediente_medico.registros_medicos;
DELETE FROM expediente_medico.expedientes;
DELETE FROM expediente_medico.pacientes;
DELETE FROM expediente_medico.usuarios;
DELETE FROM expediente_medico.roles;

-- Resetear los contadores AUTO_INCREMENT a 1
ALTER TABLE expediente_medico.roles AUTO_INCREMENT = 1;
ALTER TABLE expediente_medico.usuarios AUTO_INCREMENT = 1;
ALTER TABLE expediente_medico.pacientes AUTO_INCREMENT = 1;
ALTER TABLE expediente_medico.expedientes AUTO_INCREMENT = 1;
ALTER TABLE expediente_medico.registros_medicos AUTO_INCREMENT = 1;

-- Reactivar restricciones de clave foránea
SET FOREIGN_KEY_CHECKS = 1;

-- Insertar roles
INSERT INTO expediente_medico.roles (nombre) VALUES ('PACIENTE'), ('ENFERMERA'), ('MEDICA');

-- Insertar usuarios con contraseña encriptada (1234 en BCrypt)
INSERT INTO expediente_medico.usuarios (nombre, identificacion, email, password, rol_id, activo) VALUES 
('Juan Pérez Paciente', '1001', 'paciente@correo.com', '$2a$10$9KQZZ6PZD5HqKNDlXpZf.OzRHp.nYLNsKQCMgRN6jCAHx5i9z5gE2', 1, true),
('María López Enfermera', '2001', 'enfermera@hospital.com', '$2a$10$9KQZZ6PZD5HqKNDlXpZf.OzRHp.nYLNsKQCMgRN6jCAHx5i9z5gE2', 2, true),
('Dra. Sofia Médica', '3001', 'medica@hospital.com', '$2a$10$9KQZZ6PZD5HqKNDlXpZf.OzRHp.nYLNsKQCMgRN6jCAHx5i9z5gE2', 3, true);

-- Verificar los datos insertados
SELECT 'ROLES CREADOS:' as resultado;
SELECT * FROM expediente_medico.roles;

SELECT 'USUARIOS CREADOS:' as resultado;
SELECT u.id, u.nombre, u.email, r.nombre as rol FROM expediente_medico.usuarios u 
LEFT JOIN expediente_medico.roles r ON u.rol_id = r.id;
