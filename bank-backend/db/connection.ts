import { Sequelize } from 'sequelize';
// import * as pg from 'pg';

import { DB_NAME, DB_USER, DB_PASS, HOST, DB_PORT } from '../conf';


const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASS);

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`


const db = new Sequelize( URI, {    
    dialect: 'postgres',
    // dialectModule: pg,
    // logging: false
})

db.sync();

export default db;