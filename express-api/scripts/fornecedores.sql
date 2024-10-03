### CRIAÇÃO DA TABELA : FORNECEDORES
USE DBmain;

CREATE TABLE fornecedores (
	id INT PRIMARY KEY AUTO_INCREMENT,
    codigo INT NOT NULL UNIQUE,
    nome VARCHAR(75) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    responsavel VARCHAR(30),
    contato VARCHAR(13) NOT NULL,
    agencia VARCHAR(6),
    conta VARCHAR(10),
    pix VARCHAR(50),
    uf VARCHAR(2),
    bairro VARCHAR(30),
    cidade VARCHAR(50),
    endereco VARCHAR(80),
    complemento VARCHAR(30),
    descricao TEXT
);

### PROCEDURES PARA TABELA : FORNECEDORES
USE DBmain;

# DADOS PARA GRID:
DELIMITER $$
CREATE PROCEDURE grid_fornecedores ( buscaIn VARCHAR(100) )
BEGIN    
	SELECT fornecedores.id, fornecedores.codigo, fornecedores.nome, fornecedores.cnpj FROM (
		SELECT id, CONCAT ( codigo, nome, cnpj) AS busca FROM fornecedores ) busca
	LEFT JOIN fornecedores ON busca.id = fornecedores.id WHERE busca.busca LIKE buscaIn ORDER BY fornecedores.codigo;
END $$
DELIMITER ;


# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_fornecedor ( codigoIn INT, nomeIn VARCHAR(75), cnpjIn VARCHAR(18), responsavelIn VARCHAR(30),
	contatoIn VARCHAR(13), agenciaIn VARCHAR(6), contaIn VARCHAR(10), pixIn VARCHAR(50), ufIn VARCHAR(2),
	bairroIn VARCHAR(30), cidadeIn VARCHAR(50), enderecoIn VARCHAR(80), complementoIn VARCHAR(30), descricao TEXT )

BEGIN
	IF NOT EXISTS ( SELECT id FROM fornecedores WHERE ( codigo = codigoIn OR cnpj = cnpjIn )) THEN
		INSERT INTO fornecedores ( codigo, nome, cnpj, responsavel, contato, agencia, conta, pix, uf,
			bairro, cidade, endereco, complemento, descricao )
		VALUES ( codigoIn, nomeIn, cnpjIn, responsavelIn, contatoIn, agenciaIn, contaIn, pixIn, ufIn, bairroIn,
			cidadeIn, enderecoIn, complementoIn, descricao);
    ELSE
		SELECT
			CASE WHEN codigo = codigoIn THEN "codigo" END AS codigo,
			CASE WHEN cnpj = cnpjIn THEN "cnpj" END AS cnpj
		FROM fornecedores WHERE ( cnpj = cnpjIn OR codigo = codigoIn);
	END IF;
END $$
DELIMITER ;


# ALTERAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE alterar_fornecedor ( idIn INT, codigoIn INT, nomeIn VARCHAR(75), cnpjIn VARCHAR(18), responsavelIn VARCHAR(30),
	contatoIn VARCHAR(13), agenciaIn VARCHAR(6), contaIn VARCHAR(10), pixIn VARCHAR(50), ufIn VARCHAR(2),
	bairroIn VARCHAR(30), cidadeIn VARCHAR(50), enderecoIn VARCHAR(80), complementoIn VARCHAR(30), descricaoIn TEXT )
BEGIN
	IF EXISTS ( SELECT id FROM fornecedores WHERE id = idIn ) THEN
        IF NOT EXISTS ( SELECT codigo, cnpj FROM fornecedores WHERE ( codigo = codigoIn OR cnpj = cnpjIn ) AND id <> idIn ) THEN
            UPDATE fornecedores SET codigo = codigoIn, nome = nomeIn, cnpj = cnpjIn, responsavel = responsavelIn, contato = contatoIn,
            agencia = agenciaIn, conta = contaIn, pix = pixIn, uf = ufIn, bairro = bairroIn, cidade = cidadeIn, endereco = enderecoIn,
            complemento = complementoIn, descricao = descricaoIn
            WHERE id = idIn;
		
        ELSE
			SELECT
				CASE WHEN codigo = codigoIn THEN "codigo" END AS codigo,
				CASE WHEN cnpj = cnpjIn THEN "cnpj" END AS cnpj
            FROM fornecedores WHERE ( codigo = codigoIn OR cnpj = cnpjIn) AND id <> idIn;
		END IF;
	ELSE
		SELECT id FROM fornecedores WHERE id = idIn;
    END IF;
END $$
DELIMITER ;
DROP PROCEDURE alterar_fornecedor;

# CONSULTAR REGISTRO:
DELIMITER $$
CREATE PROCEDURE consultar_fornecedor ( idIn INT )
BEGIN
SELECT * FROM fornecedores WHERE id = idIn;
END $$
DELIMITER ;


# CÓDIGO DISPONÍVEL:
DELIMITER $$
CREATE PROCEDURE codigo_fornecedor ( )
BEGIN
SELECT IFNULL(MAX(codigo), 0) +1 AS codigo FROM fornecedores;
END $$
DELIMITER ;