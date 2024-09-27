### PROCEDURES PARA TABELA DE PRODUTOS :
USE DBmain;

# DADOS DA GRID:
DELIMITER $$
CREATE PROCEDURE grid_produtos ( )
BEGIN
SELECT id, codigo, nome, medida FROM produtos;
END $$
DELIMITER ;

# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_produto
	( codigoIn INT, nomeIn VARCHAR(25), marcaIn VARCHAR(25), medidaIn VARCHAR(15),
	categoriaIn INT, localizacaoIn VARCHAR(20), centro_custoIn TINYINT, almoxarifadoIn TINYINT, descricaoIn TEXT)

BEGIN
	IF EXISTS ( SELECT id FROM produtos WHERE codigo = `codigoIn` ) THEN
		SELECT id FROM produtos WHERE codigo = `codigoIn`;
        
	ELSE
		INSERT INTO produtos 
        (codigo, nome, marca, medida,categoria, localizacao, centro_custo, almoxarifado, descricao)
        
        VALUES 
        ( codigoIn, nomeIn, marcaIn, medidaIn, categoriaIn,
        localizacaoIn, centro_custoIn, almoxarifadoIn, descricaoIn);
	
    END IF;
END $$
DELIMITER ;

# ALTERAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE alterar_produto(idIn INT, codigoIn INT, nomeIn VARCHAR(25), marcaIn VARCHAR(25), medidaIn VARCHAR(15),
	categoriaIn VARCHAR(3), localizacaoIn VARCHAR(20), centro_custoIn TINYINT, almoxarifadoIn TINYINT, descricaoIn TEXT)
    
BEGIN
	IF NOT EXISTS ( SELECT id FROM produtos WHERE id = idIn ) THEN
		SELECT id FROM produtos WHERE id = idIn;
        
	ELSE
		UPDATE produtos 
			SET codigo = codigoIn, nome = nomeIn, marca = marcaIn, medida = medidaIn, categoria = NULLIF(categoriaIn, ''),
			localizacao = localizacaoIn, centro_custo = centro_custoIn, almoxarifado = almoxarifadoIn,
            descricao = descricaoIn
        WHERE id = idIn;
	
    END IF;
END $$
DELIMITER ;

# CONSULTAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE consultar_produto (idIn INT)
BEGIN
	SELECT PR.*,
	CA.id AS idCategoria, CA.nome AS nomeCategoria, CA.codigo AS codigoCategoria,
	CC.id AS idCentro_custo, CC.codigo AS codigoCentro_custo, CC.nome AS nomeCentro_custo,
	AL.id AS idAlmoxarifado, AL.codigo AS codigoAlmoxarifado, AL.nome AS nomeAlmoxarifado
	FROM produtos AS PR
	LEFT JOIN categorias AS CA ON PR.categoria = CA.id
	LEFT JOIN centro_custo AS CC ON PR.centro_custo = CC.id
	LEFT JOIN almoxarifado AS AL ON PR.almoxarifado = AL.id
	WHERE PR.id = idIn;
END $$
DELIMITER ;

# DELETAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE deletar_produto ( idIn INT)
BEGIN
	IF EXISTS (SELECT id FROM produtos WHERE id = idIn) THEN
		DELETE FROM produtos WHERE id = idIn;
	
    ELSE
		SELECT id FROM produtos WHERE id = idIn;
	END IF;
END $$
DELIMITER ;

DROP PROCEDURE deletar_produto;