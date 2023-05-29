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
    const query = 'SELECT u.user_id, u.user_name, u.birthday, COUNT(*) AS book_count ' +
                  'FROM users u ' +
                  'JOIN teacher t ON u.user_id = t.user_id ' +
                  'JOIN rent r ON u.user_id = r.user_id ' +
                  'JOIN book_school bs ON r.isbn = bs.isbn AND r.school_id = bs.school_id ' +
                  'WHERE TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) < 40 ' +
                  'GROUP BY u.user_id, u.user_name, u.birthday ' +
                  'HAVING COUNT(*) = ( ' +
                  'SELECT COUNT(*) ' +
                  'FROM users uu ' +
                  'JOIN teacher tt ON uu.user_id = tt.user_id ' +
                  'JOIN rent rr ON uu.user_id = rr.user_id ' +
                  'JOIN book_school bb ON rr.isbn = bb.isbn AND rr.school_id = bb.school_id ' +
                  'WHERE TIMESTAMPDIFF(YEAR, uu.birthday, CURDATE()) < 40 ' +
                  'GROUP BY uu.user_id ' +
                  'ORDER BY COUNT(*) DESC ' +
                  'LIMIT 1 ' +
                  ')';
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