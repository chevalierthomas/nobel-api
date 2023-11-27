require('dotenv').config();
const fs = require('fs').promises;
const { Pool } = require('pg');

// Use environment variables for sensitive information
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
});

async function tryInsertLaureat(laureat, conn) {
    try {
        const result = await conn.query('SELECT COUNT(id_laureat) AS nb FROM laureat WHERE id_laureat=$1;', [laureat.id]);
        const nb = result.rows[0].nb;
        if (nb > 0) return;

        await conn.query('INSERT INTO laureat(id_laureat, surname, firstname) VALUES ($1, $2, $3);', [laureat.id, laureat.surname, laureat.firstname]);
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getCategorieById(categorie, conn) {
    try {
        const res = await conn.query('SELECT id_categorie FROM categorie WHERE libelle=$1;', [categorie]);
        return res.rows[0].id_categorie;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function tryInsertPrize(prize, conn) {
    const categorieId = await getCategorieById(prize.category, conn);
    console.log("categorieid:" + categorieId);

    try {
        await conn.query('INSERT INTO prix(year, overall_motivation, categorie_id) VALUES ($1, $2, $3);', [prize.year, prize.overallMotivation, categorieId]);
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function tryInsertCategory(categorie, conn) {
    try {
        const result = await conn.query('SELECT COUNT(id_categorie) AS nb FROM categorie WHERE libelle=$1;', [categorie]);
        const nb = result.rows[0].nb;

        if (nb <= 0) {
            await conn.query('INSERT INTO categorie(libelle) VALUES ($1);', [categorie]);
        }
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function insertData(filePath) {
    try {
        const conn = await pool.connect();
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);

            for (let prize of jsonData.prizes) {
                await tryInsertCategory(prize.category, conn);
                await tryInsertPrize(prize, conn);

                if (prize.laureates) {
                    for (let laureate of prize.laureates) {
                        await tryInsertLaureat(laureate, conn);
                    }
                }
            }
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error('Error in insertData:', err);
    }
}

const filePath = 'prize.json/prize.json';
insertData(filePath);
