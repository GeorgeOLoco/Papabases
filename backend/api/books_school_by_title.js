const pool =require('../dbconnector')

// Function to fetch data from the database

const fetchData = ([Title, Userid], callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query =" SELECT b.isbn, b.title, b.publisher, b.pages, b.summary " +
    "FROM book AS b " +
    "JOIN book_school AS bs ON b.isbn = bs.isbn " +
    "JOIN school AS s ON bs.school_id = s.school_id " +
    "JOIN ( " +
        "SELECT user_id, school_id " +
        "FROM student " +
        "UNION " +
        "SELECT user_id, school_id " +
        "FROM teacher " +
    ") AS u ON s.school_id = u.school_id " +
    "WHERE b.title = "+ "'" + Title + "' " + "AND u.user_id = " + Userid ;
    connection.query(query, [Title, Userid], (err, results) => {
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