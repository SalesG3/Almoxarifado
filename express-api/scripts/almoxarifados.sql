### PROCEDURES PARA TABELA DE ALMOXARIFADOS:
USE DBmain;

# DADOS DA GRID:
DELIMITER $$
CREATE PROCEDURE grid_almoxarifados ( buscaIn VARCHAR(100) )
BEGIN
SELECT almoxarifados.* FROM ( SELECT id, CONCAT ( codigo, ' ', nome) AS conc FROM almoxarifados ) conc
LEFT JOIN almoxarifados ON conc.id = almoxarifados.id WHERE conc LIKE buscaIn ;
END $$
DELIMITER ;

DROP PROCEDURE grid_almoxarifados;

CALL grid_almoxarifados ( ''

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
# DUAS CONDIÇÕES PARA VALIDAR ID INEXISTENTE E CODIGO JÁ EM UTILIZAÇÃO
DELIMITER $$
CREATE PROCEDURE alterar_almoxarifado ( idIn INT, codigoIn INT, nomeIn VARCHAR(50) )
BEGIN
	IF NOT EXISTS ( SELECT id FROM almoxarifados WHERE id = idIn) THEN
		RETURN FALSE; END IF;
    
    IF EXISTS ( SELECT id FROM almoxarifados WHERE codigo = codigoIn) THEN
		RETURN FALSE; END IF;
	
	UPDATE almoxarifados SET codigo = codigoIn, nome = nomeIn WHERE id = idIn;
    RETURN TRUE;
END $$
DELIMITER ;

DROP PROCEDURE alterar_almoxarifado;

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
SELECT MAX(codigo)+1 AS codigo FROM almoxarifados;
END $$
DELIMITER ;

DROP PROCEDURE codigo_almoxarifado;