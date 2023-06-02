const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (userid, categoryname, title, authorname, copys, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }
    
    let query =
      `SELECT b.title, b.isbn, bs.available_copys, GROUP_CONCAT(a.author_name) AS authors
      FROM book b
      JOIN book_school bs ON b.isbn = bs.isbn
      JOIN book_category bc ON b.isbn = bc.isbn
      JOIN category c ON bc.category_id = c.category_id
      JOIN book_author ba ON b.isbn = ba.isbn
      JOIN author a ON ba.author_id = a.author_id
      JOIN handlers h ON bs.school_id = h.school_id
      WHERE h.user_id = ?`;

    const queryParams = [userid];

    if (categoryname !== '-1') {
      query += " AND c.category_name = ?";
      queryParams.push(categoryname);
    }

    if (title !== '-1') {
      query += " AND b.title = ?";
      queryParams.push(title);
    }

    if (authorname !== '-1') {
      query += " AND a.author_name = ?";
      queryParams.push(authorname);
    }

    if (copys !== '-1') {
      query += " AND bs.copys = ?";
      queryParams.push(copys);
    }
    query += " GROUP BY b.title, b.isbn, bs.available_copys"
    connection.query(query, queryParams, (err, results) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing the query:', err);
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  });
};
module.exports = {fetchData};