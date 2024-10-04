### PROCEDURES PARA TABELA DE ALMOXARIFADOS:
USE DBmain;


# DADOS DA GRID:
DELIMITER $$
CREATE PROCEDURE grid_almoxarifados ( buscaIn VARCHAR(100) )
BEGIN
	SELECT almoxarifados.* FROM ( SELECT id, CONCAT ( codigo, ' ', nome) AS conc FROM almoxarifados ) conc
	LEFT JOIN almoxarifados ON conc.id = almoxarifados.id WHERE conc LIKE buscaIn ORDER BY codigo;
END $$
DELIMITER ;


# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_almoxarifado ( codigoIn INT, nomeIn VARCHAR(50))
BEGIN
	IF EXISTS (SELECT id FROM almoxarifados WHERE codigo = codigoIn) THEN
		SELECT id FROM almoxarifados WHERE codigo = codigoIn;
    ELSE 
		INSERT INTO almoxarifados ( codigo, nome ) VALUES (codigoIn, nomeIn);
    END IF;
END $$
DELIMITER ;


# ALTERAR REGISTRO: DESENVOLVIMENTO
DELIMITER $$
CREATE PROCEDURE alterar_almoxarifado ( idIn INT, codigoIn INT, nomeIn VARCHAR(50) )
BEGIN
	IF EXISTS ( SELECT id FROM almoxarifados WHERE id = idIn) THEN
		IF NOT EXISTS ( SELECT codigo FROM almoxarifados WHERE codigo = codigoIn AND id <> idIn) THEN
			UPDATE almoxarifados SET codigo = codigoIn, nome = nomeIn WHERE id = idIn;
		ELSE
			SELECT id FROM almoxarifados WHERE id = idIn;
		END IF;
	ELSE
		SELECT id FROM almoxarifados WHERE id = idIn;
	END IF;
END $$
DELIMITER ;


# CONSULTAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE consultar_almoxarifado (idIn INT)
BEGIN
	SELECT id, codigo, nome FROM almoxarifados WHERE id = idIn;
END $$
DELIMITER ;


# CODIGO DISPONIVEL:
DELIMITER $$
CREATE PROCEDURE codigo_almoxarifado ( )
BEGIN
	SELECT IFNULL(MAX(codigo), 0) +1 AS codigo FROM almoxarifados;
END $$
DELIMITER ;