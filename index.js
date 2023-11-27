fs = require('fs');
const {Pool} = require('pg')

const connectionString = 'postgresql://tdubreui:1811@localhost:5432/bdd_projet';

const pool = new Pool({
    connectionString: connectionString,
});

async function tryInsertLaureat(laureat,conn) {

    try {
        const result = await conn.query('SELECT COUNT(id_laureat) AS nb FROM laureat WHERE id_laureat=$1;',[laureat.id]);
        const nb = result.rows[0].nb;
        if(nb>0)
            return;
        await conn.query('INSERT INTO laureat(id_laureat,surname,firstname)\n' +
            'VALUES ($1,$2,$3)\n' +
            ';',[laureat.id,laureat.surname,laureat.firstname]);

    } catch (error) {
        console.error('Error executing query:', error);
    }
}
async function getCategorieById(categorie,conn)
{
    try
    {
        const res = await conn.query('SELECT id_categorie FROM categorie WHERE libelle=$1;', [categorie]);
        return res.rows[0].id_categorie;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}
async function tryInsertPrize(prize,conn)
{
    categorieId = await getCategorieById(prize.category,conn);
    console.log("categorieid:"+categorieId)

    try {
        return await conn.query('INSERT INTO prix(year,overall_motivation,categorie_id)\n' +
            'VALUES ($1,$2,$3)\n' +
            ';',[prize.year,prize.overallMotivation,categorieId])
    } catch (error) {
        console.error('Error executing query:', error);
    }
}
async function tryInsertCategory(categorie,conn) {
    try {
        const result = await conn.query('SELECT COUNT(id_categorie) AS nb FROM categorie WHERE libelle=$1;',[categorie]);
        const nb = result.rows[0].nb;
        console.log('OCCURENCE DE CON' + nb);

        if(nb<= 0) {
            console.log("nb = " + nb > 0);
            await conn.query('INSERT INTO categorie(libelle)\n' +
                'VALUES ($1)\n' +
                ';', [categorie]);
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

const filePath = 'prize.json/prize.json'

async function insert()
{
    const conn = await pool.connect();
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        const jsonData = JSON.parse(data);
        //console.log('data:', jsonData.prizes[0].laureates[0]);

        for (let i = 0; i < jsonData.prizes.length; i++) {
            //for (let i = 0; i < 1; i++) {
            const prize = jsonData.prizes[i];
            console.log("c  t"+ prize.category)
            tryInsertCategory(prize.category,conn)
            tryInsertPrize(prize,conn)

            if(prize.laureates == null)
                continue
            for (let j = 0; j < prize.laureates.length; j++) {
                const laureate = prize.laureates[j];
                tryInsertLaureat(laureate,conn)
                //console.log(laureate)
            }

            //console.log('Prize data:', jsonData.prizes[i]);
        }
        conn.release();
    });
}

insert();