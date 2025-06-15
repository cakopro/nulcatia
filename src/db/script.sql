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

-- Tabla Gatitos con rol técnico según el clan
CREATE TABLE Gatitos (
    id_gato INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT,
    id_clan INT,
    rol ENUM("frontend", "backend", "versionador", "seguridad"),
    FOREIGN KEY (id_clan) REFERENCES Clanes(id_clan)
);

-- Tabla Usuarios con rol de acceso (admin o normal)
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100),
    contraseña VARCHAR(100),
    correo VARCHAR(100),
    rol ENUM("admin", "normal") DEFAULT "normal"
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

INSERT INTO Clanes (nombre) VALUES
('Clan Backend'),
('Clan Frontend'),
('Clan de Versiones'),
('Clan de Seguridad');

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

INSERT INTO Gatitos (nombre, apellido, edad, id_clan, rol) VALUES
('Felix', 'Socketpaw', 5, 1, 'backend'),
('Serafina', 'Cachewhisker', 4, 2, 'frontend'),
('Orion', 'Rollback', 6, 3, 'versionador'),
('Echo', 'Testclaw', 4, 4, 'seguridad'),
('Captain', 'Middleware', 6, 1, 'backend'),
('Nova', 'Schemaforge', 5, 2, 'frontend'),
('Ajax', 'Whisperpaw', 3, 3, 'versionador'),
('Vega', 'Docstring', 5, 3, 'versionador'),
('Patch', 'Cyberscratch', 4, 4, 'seguridad');

INSERT INTO ClanTerri (id_clan, id_territorio) VALUES
(1, 1), (1, 6), (1, 7),
(2, 2), (2, 4),
(3, 3), (3, 9),
(4, 5), (4, 8);

INSERT INTO Pergaminos (clan, titulo, texto) VALUES
(1, 'El Núcleo del Servidor', 'Secretos del backend revelados'),
(2, 'La Sagrada Interfaz', 'Diseño divino del usuario'),
(3, 'Libro de Versionado', 'Códigos antiguos del control de cambios'),
(4, 'Firewall Eterno', 'Protección ancestral contra amenazas digitales');

INSERT INTO Usuarios (nombre_usuario, contraseña, correo, rol) VALUES
('adminmaster', 'admin123', 'admin@nulcatia.cl', 'admin'),
('gatofront', 'clave123', 'frontend@nulcatia.cl', 'normal'),
('gatoadmin', 'seguro456', 'seguridad@nulcatia.cl', 'admin');
