### PROCEDURES PARA TABELA DE CATEGORIAS:
USE DBmain;

# DADOS DA GRID:
DELIMITER $$
CREATE PROCEDURE grid_categorias ( )
BEGIN
	SELECT almoxarifados.* FROM ( SELECT id, CONCAT ( codigo, ' ', nome) AS conc FROM almoxarifados ) conc
	LEFT JOIN almoxarifados ON conc.id = almoxarifados.id WHERE conc LIKE buscaIn ;
END $$
DELIMITER ;


# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_categoria ( codigoIn INT, nomeIn VARCHAR(50), ativoIn BOOLEAN, descricaoIn TEXT)
BEGIN
	IF NOT EXISTS ( SELECT codigo FROM categorias WHERE codigo = codigoIn) THEN
		INSERT INTO categorias ( codigo, nome, ativo, descricao) VALUES (codigoIn, nomeIn, ativoIn, descricaoIn);
	ELSE
		SELECT id FROM categorias WHERE codigo = codigoIn;
	END IF;
END $$
DELIMITER ;

# ALTERAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE alterar_categoria ( idIn INT, codigoIn INT, nomeIn VARCHAR(50), ativoIn BOOLEAN, descricaoIn TEXT )
BEGIN
	IF EXISTS ( SELECT id FROM categorias WHERE id = idIn ) THEN
        IF NOT EXISTS ( SELECT codigo FROM categorias WHERE codigo = codigoIn AND id <> idIn ) THEN
            UPDATE categorias SET codigo = codigoIn, nome = nomeIn, ativo = ativoIn, descricao = descricaoIn WHERE id = idIn;
        ELSE
			SELECT codigo FROM categorias WHERE codigo = codigoIn; END IF;
    ELSE
		SELECT id FROM categorias WHERE id = idIn; END IF;
END $$
DELIMITER ;
    
# CONSULTAR CATEGORIA:
DELIMITER $$
CREATE PROCEDURE consultar_categoria ( idIn INT )
BEGIN
SELECT * FROM categorias WHERE id = idIn;
END $$
DELIMITER ;

# CÓDIGO DISPONÍVEL:
DELIMITER $$
CREATE PROCEDURE codigo_categoria ( )
BEGIN
SELECT MAX(codigo) +1 AS codigo FROM categorias;
END $$
DELIMITER ;