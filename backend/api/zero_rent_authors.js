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
        'SELECT DISTINCT a.author_name, a.author_id ' +
        'FROM author a ' +
        'LEFT JOIN book_author ba ON a.author_id = ba.author_id ' +
        'LEFT JOIN rent r ON ba.isbn = r.isbn ' +
        'WHERE r.isbn IS NULL ' +
       'GROUP BY a.author_id';
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