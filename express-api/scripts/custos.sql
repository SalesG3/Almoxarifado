### PROCEDURES PARA TABELA DE CENTRO_CUSTOS
ALTER TABLE centro_custos RENAME custos;
USE DBmain;

# DADOS PARA GRID:
DELIMITER $$
CREATE PROCEDURE grid_custos ( )
BEGIN
SELECT id, codigo, nome FROM custos;
END $$
DELIMITER ;

# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_custo ( codigoIn INT, nomeIn VARCHAR(25) )
BEGIN
	IF NOT EXISTS ( SELECT codigo FROM custos WHERE codigo = codigoIn ) THEN
		INSERT INTO custos ( codigo, nome ) VALUES ( codigoIn, nomeIn );
	ELSE
		SELECT id FROM custos WHERE codigo = codigoIn;
	END IF;
END $$
DELIMITER ;

# ALTERAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE alterar_custo ( idIn INT, codigoIn INT, nomeIn VARCHAR(25) )
BEGIN
	IF EXISTS ( SELECT id FROM custos WHERE id = idIn ) THEN
		IF NOT EXISTS ( SELECT codigo FROM custos WHERE codigo = codigoIn AND id <> idIn ) THEN
			UPDATE custos SET codigo = codigoIn, nome = nomeIn WHERE id = idIn;
		ELSE
			SELECT id FROM custos WHERE codigo = codigoIn; END IF;
	ELSE
		SELECT id FROM custos WHERE id = idIn; END IF;
END $$
DELIMITER ;

# CONSULTAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE consultar_custo ( idIn INT)
BEGIN
	SELECT * FROM custos WHERE id = idIn;
END $$
DELIMITER ;

# CODIGO DISPONÍVEL:
DELIMITER $$
CREATE PROCEDURE codigo_custos ( )
BEGIN
SELECT MAX(codigo) +1 AS codigo FROM custos;
END $$
DELIMITER ;