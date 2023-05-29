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
    'SELECT c1.category_name AS category1, c2.category_name AS category2 ' +
    'FROM ( ' +
        'SELECT bc1.category_id AS category_id1, bc2.category_id AS category_id2, COUNT(*) AS combination_count ' +
        'FROM book_category bc1 ' +
        'JOIN book_category bc2 ON bc1.isbn = bc2.isbn AND bc1.category_id < bc2.category_id ' +
        'JOIN book b ON bc1.isbn = b.isbn ' +
        'JOIN rent r ON b.isbn = r.isbn ' +
        'GROUP BY bc1.category_id, bc2.category_id ' +
    ') AS combinations ' +
    'JOIN category c1 ON combinations.category_id1 = c1.category_id ' +
    'JOIN category c2 ON combinations.category_id2 = c2.category_id ' +
    'GROUP BY category1, category2 ' +
    'ORDER BY combination_count DESC ' +
    'LIMIT 3';
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
