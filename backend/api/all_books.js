const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = (schoolId, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query = 'SELECT * FROM book b ' +
    'JOIN book_school bs ON b.isbn = bs.isbn ' +
    'JOIN school s ON bs.school_id = s.school_id ' +
    'WHERE bs.school_id =  '+ schoolId;
    connection.query(query, [schoolId], (err, results) => {
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

