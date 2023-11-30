
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
    FOREIGN KEY (categorie_id) REFERENCES categorie (id_categorie) ON DELETE CASCADE
);

CREATE TABLE participe (
    laureat_id INT,
    prix_id INT,
    motivation TEXT,
    investissement INT,
    PRIMARY KEY (laureat_id, prix_id),
    FOREIGN KEY (laureat_id) REFERENCES laureat(id_laureat) ON DELETE CASCADE,
    FOREIGN KEY (prix_id) REFERENCES prix(id_prix)  ON DELETE CASCADE
);

SELECT * FROM laureat WHERE id_laureat=1;
SELECT * FROM prix;
SELECT * FROM categorie ;
SELECT * FROM participe;
SELECT id_categorie FROM categorie WHERE libelle='medicine';


SELECT * FROM participe GROUP BY laureat_id,prix_id HAVING count(laureat_id)=2 ;

SELECT * FROM laureat WHERE firstname='Marie';

SELECT l.firstname,l.surname
FROM participe
JOIN laureat l on participe.laureat_id = l.id_laureat
GROUP BY l.firstname,l.surname
HAVING COUNT(prix_id) > 1;


SELECT libelle FROM categorie;

SELECT count(pa.laureat_id)
FROM participe pa
JOIN prix p on p.id_prix = pa.prix_id
WHERE p.year = 2013


SELECT DISTINCT year
FROM prix
WHERE year NOT IN (SELECT DISTINCT year FROM prix);


SELECT * FROM prix WHERE year =1942;

SELECT DISTINCT year
FROM prix

WHERE overall_motivation LIKE '%No Nobel Prize was awarded this year%';

SELECT year
FROM prix
GROUP BY year
HAVING COUNT(*) = SUM(CASE WHEN overall_motivation LIKE '%No Nobel Prize was awarded this year%' THEN 1 ELSE 0 END);


SELECT count(participe.laureat_id) as "nb_laureat", p.year
from participe
JOIN prix p on participe.prix_id = p.id_prix
GROUP BY p.year
ORDER BY count(participe.laureat_id) DESC

DELETE FROM laureat WHERE id_laureat = $1;

SELECT * FROM laureat WHERE id_laureat = 1;

SELECT * from participe WHERE laureat_id = 1;


SELECT * FROM participe JOIN prix p on p.id_prix = participe.prix_id JOIN categorie c on p.categorie_id = c.id_categorie;


SELECT motivation
FROM participe
JOIN prix p on p.id_prix = participe.prix_id
JOIN categorie c on p.categorie_id = c.id_categorie
WHERE participe.laureat_id=1029 AND p.year=2023 AND c.libelle = 'chemistry'