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

const getMultiLaureat = (count, callback) => {
    getMultiLaureatAsync(count)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getMultiLaureatAsync(count) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT l.firstname,l.surname\n" +
            "FROM participe\n" +
            "JOIN laureat l on participe.laureat_id = l.id_laureat\n" +
            "GROUP BY l.firstname,l.surname\n" +
            "HAVING COUNT(prix_id) = $1;", [count]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getMultiLaureatAsync:', error);
        throw error;
    }
}
const getLaureatByYear = (year, callback) => {
    getLaureatByYearAsync(year)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getLaureatByYearAsync(year) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT count(pa.laureat_id) as nb_laureat\n"  +
            "FROM participe pa\n" +
            "JOIN prix p on p.id_prix = pa.prix_id\n" +
            "WHERE p.year = $1", [year]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getLaureatByYearAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllLaureat: getAllLaureat,
    getLaureatById:getLaureatById,
    getMultiLaureat:getMultiLaureat,
    getLaureatByYear:getLaureatByYear
}