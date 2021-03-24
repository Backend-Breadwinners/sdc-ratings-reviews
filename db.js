const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'ratingsreviewstest2',
  user: 'postgres',
  password: 'password',
  port: 5432
})

pool.query('SELECT NOW()', (err, res) => {
  console.log('THIS IS THE DB TEST: ', err, res.rows)
})

module.exports = pool;
