fs = require('fs');
const {Pool} = require('pg')

const connectionString = 'postgresql://tdubreui:1811@localhost:5432/bdd_projet';

const pool = new Pool({
    connectionString: connectionString,
});

async function tryInsertLaureat(laureat) {
    const conn = await pool.connect();

    try {
        const result = await conn.query('SELECT COUNT(id_laureat) AS nb FROM laureat WHERE id_laureat=$1;',[laureat.id]);
        const nb = result.rows[0].nb;
        if(nb>0)
            return;
        await conn.query('SELECT COUNT(id_laureat) AS nb FROM laureat WHERE id_laureat=$1;',[laureat.id]);

    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        conn.release();
    }
}

const filePath = 'prize.json/prize.json'

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    //console.log('data:', jsonData.prizes[0].laureates[0]);
    for (let i = 0; i < jsonData.prizes.length; i++) {
    //for (let i = 0; i < 3; i++) {
        const prize = jsonData.prizes[i];
        if(prize.laureates == null)
            continue
        for (let j = 0; j < prize.laureates.length; j++) {
            const laureate = prize.laureates[j];
            tryInsertLaureat(laureate)
            console.log(laureate)
        }
        //console.log('Prize data:', jsonData.prizes[i]);
    }
});