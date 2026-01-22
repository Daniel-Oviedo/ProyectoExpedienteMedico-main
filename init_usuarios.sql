-- Insertar roles
INSERT INTO expediente_medico_db.roles (nombre) VALUES ('PACIENTE'), ('ENFERMERA'), ('MEDICA') 
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Obtener IDs de roles
SELECT @paciente_role_id := id FROM expediente_medico_db.roles WHERE nombre = 'PACIENTE';
SELECT @enfermera_role_id := id FROM expediente_medico_db.roles WHERE nombre = 'ENFERMERA';
SELECT @medica_role_id := id FROM expediente_medico_db.roles WHERE nombre = 'MEDICA';

-- Insertar usuarios de prueba
-- Contraseña: 1234 (bcrypt encoded: $2a$10$7Kkxu3N9nHI7iYvNZvJr3eqYVvJlqVvJlqVvJlqVvJlqVvJlqVvJl)
INSERT INTO expediente_medico_db.usuarios (nombre, email, password, rol_id, activo) VALUES 
('Juan Pérez Paciente', 'paciente@correo.com', '$2a$10$7Kkxu3N9nHI7iYvNZvJr3eqYVvJlqVvJlqVvJlqVvJlqVvJlqVvJl', @paciente_role_id, true),
('María López Enfermera', 'enfermera@hospital.com', '$2a$10$7Kkxu3N9nHI7iYvNZvJr3eqYVvJlqVvJlqVvJlqVvJlqVvJlqVvJl', @enfermera_role_id, true),
('Dra. Sofia Médica', 'medica@hospital.com', '$2a$10$7Kkxu3N9nHI7iYvNZvJr3eqYVvJlqVvJlqVvJlqVvJlqVvJlqVvJl', @medica_role_id, true)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Insertar paciente (el usuario paciente debe tener un paciente asociado)
INSERT INTO expediente_medico_db.pacientes (nombre, identificacion, fecha_nacimiento, usuario_id)
SELECT 'Juan Pérez Paciente', '1234567890', '1990-01-15', id 
FROM expediente_medico_db.usuarios 
WHERE email = 'paciente@correo.com'
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Insertar expediente para el paciente
INSERT INTO expediente_medico_db.expedientes (paciente_id, estado, fecha_creacion)
SELECT id, 'ACTIVO', NOW()
FROM expediente_medico_db.pacientes
WHERE nombre = 'Juan Pérez Paciente'
ON DUPLICATE KEY UPDATE estado = VALUES(estado);

-- Verificar los datos insertados
SELECT 'USUARIOS CREADOS:' as resultado;
SELECT u.id, u.nombre, u.email, r.nombre as rol FROM expediente_medico_db.usuarios u 
LEFT JOIN expediente_medico_db.roles r ON u.rol_id = r.id;
