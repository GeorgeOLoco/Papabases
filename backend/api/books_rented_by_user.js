const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = (userid, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = 'SELECT b.isbn, b.title ' +
    'FROM rent AS r ' +
    'JOIN book_school AS bs ON r.isbn = bs.isbn AND r.school_id = bs.school_id ' +
    'JOIN book AS b ON bs.isbn = b.isbn ' +
    'WHERE r.user_id = ' + userid;
    connection.query(query, [userid], (err, results) => {
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
