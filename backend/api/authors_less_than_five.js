const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = 
    'SELECT a1.author_id, a1.author_name ' +
    'FROM author a1 ' +
    'WHERE ( ' +
        'SELECT COUNT(*) ' +
        'FROM book_author ba1 ' +
        'WHERE ba1.author_id = a1.author_id ' +
    ') <= ( ' +
        'SELECT COUNT(*) ' +
        'FROM book_author ba2 ' +
        'GROUP BY ba2.author_id ' +
        'ORDER BY COUNT(*) DESC ' +
        'LIMIT 1 ' +
    ') - 5';
    connection.query(query, (err, results) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }

      // Pass the retrieved data to the callback function
      callback(null, results);
    });
  });
};

module.exports = { fetchData };