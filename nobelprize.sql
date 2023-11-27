
DROP TABLE IF EXISTS participe;
DROP TABLE IF EXISTS prix;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS laureat;


CREATE TABLE laureat (
    id_laureat SERIAL PRIMARY KEY,
    surname VARCHAR(255),
    firstname VARCHAR(255)
);


CREATE TABLE categorie (
    id_categorie SERIAL PRIMARY KEY,
    libelle VARCHAR(255) UNIQUE
);


CREATE TABLE prix (
    id_prix SERIAL PRIMARY KEY,
    year INT,
    overall_motivation TEXT,
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES categorie (id_categorie)
);

CREATE TABLE participe (
    laureat_id INT,
    prix_id INT,
    motivation TEXT,
    investissement INT,
    PRIMARY KEY (laureat_id, prix_id),
    FOREIGN KEY (laureat_id) REFERENCES laureat(id_laureat),
    FOREIGN KEY (prix_id) REFERENCES prix(id_prix)
);

SELECT * FROM laureat;
SELECT * FROM prix;
SELECT * FROM categorie ;
SELECT * FROM participe;
SELECT id_categorie FROM categorie WHERE libelle='medicine';