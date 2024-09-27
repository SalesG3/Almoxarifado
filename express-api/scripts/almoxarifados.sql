### PROCEDURES PARA TABELA DE ALMOXARIFADOS:
USE DBmain;

# DADOS DA GRID:
DELIMITER $$
CREATE PROCEDURE grid_almoxarifados ( )
BEGIN
SELECT id, codigo, nome FROM almoxarifados;
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