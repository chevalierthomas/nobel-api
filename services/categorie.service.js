const pool = require("../database/db");
const {as} = require("pg-promise");

const getCategorie = (callback) => {
    getCategorieAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getCategorieAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT libelle FROM categorie;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCategorieAsync:', error);
        throw error;
    }
}
const getCategorieWithMostLeaureat = (callback) => {
    getCategorieWithMostLeaureatAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getCategorieWithMostLeaureatAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT c.libelle AS categorie\n" +
            "FROM (\n" +
            "         SELECT pr.categorie_id, COUNT(p.laureat_id) AS nombre_de_laureats\n" +
            "         FROM participe p\n" +
            "                  JOIN prix pr ON p.prix_id = pr.id_prix\n" +
            "         GROUP BY pr.categorie_id\n" +
            "     ) AS categories_laureats\n" +
            "         JOIN categorie c ON categories_laureats.categorie_id = c.id_categorie\n" +
            "ORDER BY nombre_de_laureats DESC\n" +
            "LIMIT 1;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCategorieWithMostLeaureatAsync:', error);
        throw error;
    }
}

module.exports = {
    getCategorie: getCategorie,
    getCategorieWithMostLeaureat:getCategorieWithMostLeaureat
}