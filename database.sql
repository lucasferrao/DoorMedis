CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    contacto INT NOT NULL,
    email VARCHAR(45) NOT NULL,
    cliente_password VARCHAR(50) NOT NULL,
    morada VARCHAR(100) NOT NULL,
    nif INT NOT NULL
);

CREATE TABLE IF NOT EXISTS farmacia (
    id_farmacia INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    contacto INT NOT NULL,
    email VARCHAR(45) NOT NULL,
    farmacia_password VARCHAR(50) NOT NULL,
    localizacao VARCHAR(50) NOT NULL,
    avaliacao INT NOT NULL
);

CREATE TABLE IF NOT EXISTS estafeta (
    id_estafeta INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    contacto INT NOT NULL,
    email VARCHAR(45) NOT NULL,
    estafeta_password VARCHAR(50) NOT NULL,
    avaliacao INT NOT NULL,
    nif INT NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    receita_medica BOOLEAN
);

CREATE TABLE IF NOT EXISTS stock (
    id_stock INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    id_produto INT,
    id_farmacia INT,
    FOREIGN KEY (id_produto)
		REFERENCES produto (id_produto)
        ON DELETE CASCADE,
	FOREIGN KEY (id_farmacia)
		REFERENCES farmacia (id_farmacia)
        ON DELETE CASCADE    
);

CREATE TABLE IF NOT EXISTS encomenda (
    id_encomenda INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(15) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    preco FLOAT NOT NULL,
    id_cliente INT,
    id_estafeta INT,
    id_farmacia INT,
    FOREIGN KEY (id_cliente)
		REFERENCES cliente (id_cliente)
        ON DELETE CASCADE,
	FOREIGN KEY (id_estafeta)
		REFERENCES estafeta (id_estafeta)
        ON DELETE CASCADE,
	FOREIGN KEY (id_farmacia)
		REFERENCES farmacia (id_farmacia)
        ON DELETE CASCADE    
);