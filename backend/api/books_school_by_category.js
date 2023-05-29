const pool =require('../dbconnector')

// Function to fetch data from the database

const fetchData = ([Category, Userid], callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const query =
    'SELECT b.isbn, b.title, b.publisher, b.pages, b.summary ' +
    'FROM book AS b ' +
    'JOIN book_school AS bs ON b.isbn = bs.isbn ' +
    'JOIN school AS s ON bs.school_id = s.school_id ' +
    'JOIN ( ' +
        'SELECT school_id ' +
        'FROM student ' +
        'WHERE user_id =  ' + Userid +
        ' UNION ' +
        'SELECT school_id ' +
        'FROM teacher ' +
        'WHERE user_id = ' + Userid +
   ' ) AS u ON s.school_id = u.school_id ' +
    'JOIN book_category AS bc ON b.isbn = bc.isbn ' +
    'JOIN category AS c ON bc.category_id = c.category_id ' +
    'WHERE c.category_name = ' + "'" + Category + "'"; 
    connection.query(query, [Category, Userid], (err, results) => {
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