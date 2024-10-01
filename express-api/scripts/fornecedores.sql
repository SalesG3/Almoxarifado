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
CREATE PROCEDURE grid_fornecedores ( )
BEGIN
SELECT id, codigo, nome, cnpj FROM fornecedores;
END $$
DELIMITER ;

# NOVO REGISTRO:
DELIMITER $$
CREATE PROCEDURE novo_fornecedor
	( codigoIn INT, nomeIn VARCHAR(75), cnpjIn VARCHAR(18), responsavelIn VARCHAR(30), contatoIn VARCHAR(13), agenciaIn VARCHAR(6), contaIn VARCHAR(10),
    pixIn VARCHAR(50), ufIn VARCHAR(2), bairroIn VARCHAR(30), cidadeIn VARCHAR(50), enderecoIn VARCHAR(80), complementoIn VARCHAR(30), descricaoIn TEXT )
BEGIN 
	IF NOT EXISTS ( SELECT id FROM fornecedores WHERE ( codigo = codigoIn OR cnpj = cnpjIn)) THEN
		INSERT INTO fornecedores ( codigo, nome, cnpj, responsavel, contato, agencia, conta, pix, uf, bairro, cidade, endereco, complemento, descricao )
        VALUES ( codigoIn, nomeIn, cnpjIn, responsavelIn, contatoIn, agenciaIn, contaIn, pixIn, ufIn, bairroIn, cidadeIn, enderecoIn, complementoIn, descricaoIn );
	ELSE
		SELECT codigo FROM fornecedores WHERE codigo = codigoIn;
        SELECT cnpj FROM fornecedores WHERE cnpj = cnpjIn;
	END IF;
END $$
DELIMITER ;

# ALTERAR 