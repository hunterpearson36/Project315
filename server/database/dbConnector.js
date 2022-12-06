const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const { decrypt } = require('./decrypt');

const pool = new Pool({
    user: decrypt(process.env.PSQL_USER),
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: decrypt(process.env.PSQL_PASSWORD),
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

//
async function executeQuery(query) {
    //console.log(`executing query: \"${query}\"`);
    var queryRows = [];

    return new Promise((resolve) => {
        pool.query(query).then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                queryRows.push(query_res.rows[i]);
            }
            //console.log('successfully completed query');
            resolve(queryRows);
        });
    });
}

async function executeUpdate(query) {
    //console.log(`executing update: \"${query}\"`);

    return new Promise((resolve) => {
        try {
            pool.query(query).then(() => {
                //console.log('successfully completed update');
                resolve(true);
            });
        } catch (error) {
            console.log('failed to update');
            resolve(false);
        }
    });

}

function close() {
    try {
        pool.end();
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

module.exports = {
    executeQuery:executeQuery,
    executeUpdate:executeUpdate,
    close:close
}