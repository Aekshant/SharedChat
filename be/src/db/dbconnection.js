const { Pool } = require('pg');

class DBConnection {
    constructor(connectionConfig) {
        this.pool = new Pool(connectionConfig);
    }

    async executeQuery(query, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        }
        catch (e) {
            console.error("error in execute query  ", query , e)
        }
        finally {
            client.release(); // Release the client back to the pool
        }
    }


    async executeWriteQuery(query, params) {
        const client = await this.pool.connect();
        try {
            let result = await client.query(query, params)
            return result

        } finally {
            client.release(); // Release the client back to the pool
        }
    }

 

    // Don't forget to close the pool when your application exits
    async closePool() {
        await this.pool.end();
    }
}

var dbConnectionConfig = {
    host: 'localhost',
    port: 5432,
    database: 'chatting',
    user: 'postgres',
    password: 'test',
    max: 10, // Maximum number of clients in the pool
    min: 5, // Minimum number of clients in the pool
    // ssl: { rejectUnauthorized: false }, // Adjust this based on your SSL/TLS configuration
};

const dbConnection = new DBConnection(dbConnectionConfig);

module.exports = { DBConnection, dbConnection }; // Export an OBJECT 
