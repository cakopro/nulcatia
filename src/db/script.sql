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
