const pool = require('../dbconnector');

// Function to add a user to the database
const addData = (username, password, user_name, birthday, email, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err);
      return;
    }

    // Execute a SQL query to add a user
    const query = 'INSERT INTO users (username, passcode, user_name, birthday, email, approved) VALUES (?, ?, ?, ?, ?, 0)';
    const values = [username, password, user_name, birthday, email];
    connection.query(query, values, (err, result) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        callback(err);
        return;
      }

      // Pass the result of the insert operation to the callback function
      callback(null, result);
    });
  });
};

module.exports = { addData };
