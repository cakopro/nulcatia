CREATE DATABASE IF NOT EXISTS nulcatia;
USE  nulcatia;

CREATE TABLE Clanes (
    id_clan INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Pergaminos (
    id_pergamino INT PRIMARY KEY AUTO_INCREMENT,
    clan INT,
    titulo VARCHAR(100),
    texto VARCHAR(100),
    FOREIGN KEY (clan) REFERENCES Clanes(id_clan)
);

CREATE TABLE Gatitos (
    id_gato INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT,
    id_clan INT,
    rol ENUM("admin", "admin clan", "principiante"),
    FOREIGN KEY (id_clan) REFERENCES Clanes(id_clan)
);

CREATE TABLE Territorios (
    id_territorio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    kilometros INT 
);

CREATE TABLE ClanTerri (
    id_clan INT,
    id_territorio INT,
    PRIMARY KEY (id_clan, id_territorio),
    FOREIGN KEY (id_clan) REFERENCES Clanes(id_clan),
    FOREIGN KEY (id_territorio) REFERENCES Territorios(id_territorio)
);

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
('Felix', 'Socketpaw', 5, 1, 'Arquitecto de Conexiones'),
('Serafina', 'Cachewhisker', 4, 4, 'Guardiana de la Latencia'),
('Captain', 'Middleware', 6, 1, 'Centinela de Seguridad'),
('Ajax', 'Whisperpaw', 3, 2, 'Mensajero Asíncrono'),
('Nova', 'Schemaforge', 5, 1, 'Ingeniera de Datos'),
('Echo', 'Testclaw', 4, 4, 'Inspector de Calidad'),
('Orion', 'Rollback', 6, 3, 'Guardián de Integridad'),
('Vega', 'Docstring', 5, 3, 'Cronista Oficial');

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

