const pool = require("../database/db");
const {as} = require("pg-promise");


const getAllLaureat = (callback) => {
    getAllLaureatAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllLaureatAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM laureat;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllLaureatAsync:', error);
        throw error;
    }
}

const getLaureatById = (id, callback) => {
    getLaureatByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getLaureatByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM laureat WHERE id_laureat = $1", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getLaureatByIdAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllLaureat: getAllLaureat,
    getLaureatById:getLaureatById
}