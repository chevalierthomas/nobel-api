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

module.exports = {
    getCategorie: getCategorie,
}