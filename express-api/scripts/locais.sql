### CRIAÇÃO DE TABELAS : LOCAIS & RESPONSÁVEIS
USE DBmain;

CREATE TABLE IF NOT EXISTS locais (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    codigo SMALLINT NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    ativo BOOLEAN,
    endereco VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS responsaveis (
	id INT PRIMARY KEY AUTO_INCREMENT,
    local SMALLINT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    inicio DATE NOT NULL,

	FOREIGN KEY (local) REFERENCES locais(id)
);

# NOVO REGISTRO : DUAS PROCEDURES
DELIMITER $$
CREATE PROCEDURE novo_local ( codigoIn INT, nomeIn VARCHAR(50), ativoIn BOOLEAN,  enderecoIn VARCHAR(100), descricaoIn TEXT )
BEGIN
	IF NOT EXISTS ( SELECT codigo FROM locais WHERE codigo = codigoIn ) THEN
		INSERT INTO locais ( codigo, nome, ativo, endereco, descricao )
        VALUES ( codigoIn, nomeIn, ativoIn, enderecoIn, descricaoIn );
	ELSE 
		SELECT codigo FROM locais WHERE codigo = codigoIn;
	END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE novo_responsavel ( codigoIn INT, nomeIn VARCHAR(50), inicioIn DATE )
BEGIN
	DECLARE id_local INT;
	SET id_local = ( SELECT id FROM locais WHERE codigo = codigoIn );
    INSERT INTO responsaveis ( local, nome, inicio ) VALUES ( id_local, nomeIn, inicioIn );
END $$
DELIMITER ;