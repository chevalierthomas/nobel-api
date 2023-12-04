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
async function getCategorieById(categorie, conn) {
    try {
        const res = await conn.query('SELECT id_categorie FROM categorie WHERE libelle=$1;', [categorie]);
        if (res.rows.length > 0) {
            return parseInt(res.rows[0].id_categorie);
        } else {
            console.log(`Category ${categorie} not found.`);
            return null; // Or appropriate value indicating not found
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return null; // Or appropriate error value
    }
}

async function tryInsertPrize(prize, conn) {
    const categorieId = await getCategorieById(prize.category, conn);
    console.log("categorieId:", categorieId);

    if (!categorieId) {
        console.error(`Category ID not found for category: ${prize.category}`);
        return null; // Or appropriate error handling
    }

    try {
        const insertResult = await conn.query('INSERT INTO prix(year, overall_motivation, categorie_id) VALUES ($1, $2, $3);', [prize.year, prize.overallMotivation, categorieId]);
        return insertResult;
    } catch (error) {
        console.error('Error executing query:', error);
        return null; // Or appropriate error handling
    }
}

async function tryInsertCategory(categorie, conn) {
    try {
        const result = await conn.query('SELECT COUNT(id_categorie) AS nb FROM categorie WHERE libelle=$1;', [categorie]);
        const nb = parseInt(result.rows[0].nb);

        console.log('Number of occurrences for category:', nb);

        if (nb == 0) {
            await conn.query('INSERT INTO categorie(libelle) VALUES ($1);', [categorie]);
            console.log(`Category '${categorie}' inserted.`);
        } else {
            console.log(`Category '${categorie}' already exists. No insertion needed.`);
        }
    } catch (error) {
        console.error('Error executing query:', error);
        // Consider how to handle this error. Rethrow, return false, etc.
    }
}


async function processPrizes(jsonData, conn) {
    for (let i = 0; i < jsonData.prizes.length; i++) {
        const prize = jsonData.prizes[i];
        try {
            await tryInsertCategory(prize.category, conn);

            if (prize.laureates) {
                for (let j = 0; j < prize.laureates.length; j++) {
                    const laureate = prize.laureates[j];
                    await tryInsertLaureat(laureate, conn);
                }
            }
        } catch (error) {
            console.error('Error processing categories or laureates:', error);
        }
    }
    for (let i = 0; i < jsonData.prizes.length; i++) {
        const prize = jsonData.prizes[i];
        try {
            await tryInsertPrize(prize, conn);
        } catch (error) {
            console.error('Error inserting prize:', error);
        }
    }

    for (let i = 0; i < jsonData.prizes.length; i++) {
        const prize = jsonData.prizes[i];
        try {
            await tryInsertParticipations(prize, conn);
        } catch (error) {
            console.error('Error inserting prize:', error);
        }
    }


}

async function tryInsertParticipations(prize, conn) {
    // Assuming prize has a property that can be used to get the prix_id
    // If not, you may need to adjust the following line to fetch or calculate the prix_id
    const prixId = await getPrixIdByYearAndCategory(prize.year, prize.category, conn);
    if(prize.laureates === undefined)
    {
        console.log("undefined prize laureates")
        return;
    }
    for (const laureate of prize.laureates) {
        try {
            const query = 'INSERT INTO participe(laureat_id, prix_id, motivation, investissement) VALUES ($1, $2, $3, $4)';
            const values = [laureate.id, prixId, laureate.motivation, laureate.share];

            await conn.query(query, values);
            console.log(`Participation added for laureate ID ${laureate.id} and prize ID ${prixId}.`);
        } catch (error) {
            console.error('Error executing query for laureate ID ' + laureate.id + ':', error);
            // Consider how to handle this error. Rethrow, return false, etc.
        }
    }
}

async function getPrixIdByYearAndCategory(year, category, conn) {
    try {
        const categorieId = await getCategorieIdByName(category, conn);
        if (!categorieId) {
            return null; // Category not found, so no corresponding prix record will exist
        }

        const query = 'SELECT id_prix FROM prix WHERE year = $1 AND categorie_id = $2;';
        const result = await conn.query(query, [year, categorieId]);
        if (result.rows.length > 0) {
            return result.rows[0].id_prix;
        } else {
            console.log(`No prize found for year ${year} and category ID ${categorieId}.`);
            return null;
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}

async function getCategorieIdByName(categoryName, conn) {
    // Assuming you have a method to get the category ID from its name
    try {
        const query = 'SELECT id_categorie FROM categorie WHERE libelle = $1;';
        const result = await conn.query(query, [categoryName]);
        if (result.rows.length > 0) {
            return result.rows[0].id_categorie;
        } else {
            console.log(`Category ${categoryName} not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}





const filePath = 'prize.json/prize.json'

async function insert()
{
    const conn = await pool.connect();
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the fServicesile:', err);
            return;
        }
        const jsonData = JSON.parse(data);
        //console.log('data:', jsonData.prizes[0].laureates[0]);

        processPrizes(jsonData, conn).then(() => {
            console.log('Finished processing prizes');
        }).catch(error => {
            console.error('An error occurred:', error);
        });


        conn.release();
    });
}

insert();