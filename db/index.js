const { Pool } = require('pg');
const config = require('../config.js');

const pool = new Pool({
  host: 'localhost',
  database: 'ratingsreviewstest2',
  user: 'postgres',
  password: config.password,
  port: 5432
})

pool.query('SELECT NOW()', (err, res) => {
  console.log('THIS IS THE DB TEST: ', err, res.rows)
})

module.exports = pool;