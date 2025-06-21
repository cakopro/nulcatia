DROP DATABASE IF EXISTS nulcatia;
CREATE DATABASE nulcatia;
USE nulcatia;

-- Tabla Clanes
CREATE TABLE Clanes (
    id_clan INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla Pergaminos
CREATE TABLE Pergaminos (
    id_pergamino INT PRIMARY KEY AUTO_INCREMENT,
    clan INT,
    titulo VARCHAR(100),
    texto VARCHAR(100),
    FOREIGN KEY (clan) REFERENCES Clanes(id_clan)
);

-- Tabla Gatitos 
CREATE TABLE Gatitos (
    id_gato INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nacimiento DATE,
    id_clan INT,
    experiencia ENUM("novato", "principiante", "maestro"),
    FOREIGN KEY (id_clan) REFERENCES Clanes(id_clan)
);

-- Tabla Usuarios con rol de acceso (admin o normal)
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100),
    contraseña VARCHAR(100),
    correo VARCHAR(100),
    rol ENUM("admin", "normal") DEFAULT "normal",
    id_gato INT,
    FOREIGN KEY (id_gato) REFERENCES Gatitos(id_gato) 
);

-- Tabla Territorios
CREATE TABLE Territorios (
    id_territorio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    kilometros INT 
);

-- Relación Clan ↔ Territorio
CREATE TABLE ClanTerri (
    id_clan INT,
    id_territorio INT,
    PRIMARY KEY (id_clan, id_territorio),
    FOREIGN KEY (id_clan) REFERENCES Clanes(id_clan),
    FOREIGN KEY (id_territorio) REFERENCES Territorios(id_territorio)
);

-- Inserciones

CREATE INDEX idx_gatitos_id_clan ON Gatitos(id_clan);
CREATE INDEX idx_usuarios_id_gato ON Usuarios(id_gato);
CREATE INDEX idx_pergaminos_clan ON Pergaminos(clan);

-- Inserciones
INSERT INTO Clanes (nombre) VALUES
('Clan Backend'),
('Clan Frontend'),
('Clan de Versiones'),
('Clan de Seguridad');

INSERT INTO Gatitos (nombre, apellido, fecha_nacimiento, id_clan, experiencia) VALUES
('Felix', 'Socketpaw', '2019-03-15', 1, 'maestro'),
('Serafina', 'Cachewhisker', '2020-07-10', 2, 'principiante'),
('Orion', 'Rollback', '2018-12-25', 3, 'maestro'),
('Echo', 'Testclaw', '2020-11-01', 4, 'principiante'),
('Captain', 'Middleware', '2018-02-19', 1, 'maestro'),
('Nova', 'Schemaforge', '2019-10-12', 2, 'novato'),
('Ajax', 'Whisperpaw', '2021-04-03', 3, 'novato'),
('Vega', 'Docstring', '2019-08-29', 3, 'principiante'),
('Patch', 'Cyberscratch', '2020-01-18', 4, 'novato');

INSERT INTO Usuarios (nombre_usuario, contraseña, correo, rol, id_gato) VALUES
('adminmaster', 'admin123', 'admin@nulcatia.cl', 'admin', 1),
('gatofront', 'clave123', 'frontend@nulcatia.cl', 'normal', 2),
('gatoadmin', 'seguro456', 'seguridad@nulcatia.cl', 'admin', 4),
('cako', 'cako123', 'cakoofernandez@gmail.com', 'admin', 5),
('orion_maestro', 'claveorion', 'orion@nulcatia.cl', 'normal', 3),
('nova_novato', 'novapass', 'nova@nulcatia.cl', 'normal', 6),
('ajax_version', 'rollback', 'ajax@nulcatia.cl', 'normal', 7),
('vega_test', 'vegatest', 'vega@nulcatia.cl', 'normal', 8),
('patch_cyber', 'cyber456', 'patch@nulcatia.cl', 'normal', 9);

INSERT INTO Pergaminos (clan, titulo, texto) VALUES
(1, 'El Núcleo del Servidor', 'Secretos del backend revelados'),
(2, 'La Sagrada Interfaz', 'Diseño divino del usuario'),
(3, 'Libro de Versionado', 'Códigos antiguos del control de cambios'),
(4, 'Firewall Eterno', 'Protección ancestral contra amenazas digitales');

INSERT INTO Territorios (nombre, kilometros) VALUES
('Bosques Binarios', 120),
('Ríos de Paquetes', 85),
('Montañas de Índices', 200),
('Praderas de Pila', 150),
('Archipiélago de APIs', 300),
('Cuevas de Caché', 100),
('Océanos de Objetos', 500),
('Llanuras de Logs', 180),
('Valles de Versiones', 220);

INSERT INTO ClanTerri (id_clan, id_territorio) VALUES
(1, 1), (1, 6), (1, 7),
(2, 2), (2, 4),
(3, 3), (3, 9),
(4, 5), (4, 8);