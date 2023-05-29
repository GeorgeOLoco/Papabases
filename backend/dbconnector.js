const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'papamaster',
  password: 'password',
  database: 'library_project',
  connectionLimit: 10 // Adjust the limit as per your requirements
});

module.exports = pool;


// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    connection.release();
  }
});
