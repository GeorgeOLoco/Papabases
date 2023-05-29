/*const pool = require('../dbconnector');

// Function to fetch data from the database

const fetchData = (Category, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const teacherquery = connection.query(
        'SELECT DISTINCT u.user_id, u.user_name ' +
        'FROM users u ' +
        'JOIN teacher t ON u.user_id = t.user_id ' +
        'JOIN rent r ON u.user_id = r.user_id ' +
        'JOIN book_school bs ON r.isbn = bs.isbn AND r.school_id = bs.school_id ' +
        'JOIN book_category bc ON bs.isbn = bc.isbn ' +
        'JOIN category c ON bc.category_id = c.category_id ' +
        'WHERE c.category_name = '+ "'" + Category + "'" + 
        ' AND r.date_of_rent >= DATE_SUB(NOW(), INTERVAL 1 YEAR) ' +
        'GROUP BY u.user_id', [Category]);

        //os dame e8kialeksen tus teachers je en mesa stin metavliti teacherquery
      
    const authorquery = connection.query(
        'SELECT DISTINCT a.author_name ' +
        'FROM author a ' +
        'JOIN book_author ba ON a.author_id = ba.author_id ' +
        'JOIN book_category bc ON ba.isbn = bc.isbn ' +
        'JOIN category c ON bc.category_id = c.category_id ' +
        'WHERE c.category_name = ' + "'" + Category + "' " + 
        'GROUP BY a.author_id', [Category]);
        //os dame e8kialeksen tus authors je en mesa stin metavliti teacherquery
    
        
        let json_list=[];//dimiurgo lista
        for(elem of teacherquery){
        json_list.push({
        id: elem.user_id,
        name: elem.user_name,
        works_as: "teacher",
        });
        }//kamo push tus teachers me ta values id,name,surname,works_as
        
        for(elem of authorquery){
        json_list.push({
        id: elem.author_id,
        name: elem.author_name,
        works_as: "author",
        });


      // Pass the retrieved data to the callback function
      callback(null, json_list);

  };
});

 
module.exports = { fetchData };
*/


const pool = require('../dbconnector');

// Function to fetch data from the database
const fetchData = (Category, callback) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    // Execute a SQL query to fetch data
    const teacherquery = connection.query(
      'SELECT DISTINCT u.user_id, u.user_name ' +
      'FROM users u ' +
      'JOIN teacher t ON u.user_id = t.user_id ' +
      'JOIN rent r ON u.user_id = r.user_id ' +
      'JOIN book_school bs ON r.isbn = bs.isbn AND r.school_id = bs.school_id ' +
      'JOIN book_category bc ON bs.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'WHERE c.category_name = ' + "'" + Category + "'" +
      ' AND r.date_of_rent >= DATE_SUB(NOW(), INTERVAL 1 YEAR) ' +
      'GROUP BY u.user_id', [Category]);

    const authorquery = connection.query(
      'SELECT DISTINCT a.author_name ' +
      'FROM author a ' +
      'JOIN book_author ba ON a.author_id = ba.author_id ' +
      'JOIN book_category bc ON ba.isbn = bc.isbn ' +
      'JOIN category c ON bc.category_id = c.category_id ' +
      'WHERE c.category_name = ' + "'" + Category + "' " +
      'GROUP BY a.author_id', [Category]);

    let json_list = []; // Create a list

    // Fetch rows from teacherquery
    teacherquery
      .on('result', (row) => {
        json_list.push({
          id: row.user_id,
          name: row.user_name,
          works_as: "teacher",
        });
      })
      .on('end', () => {
        // Fetch rows from authorquery
        authorquery
          .on('result', (row) => {
            json_list.push({
              id: row.author_id,
              name: row.author_name,
              works_as: "author",
            });
          })
          .on('end', () => {
            // Release the connection back to the pool
            connection.release();

            // Pass the retrieved data to the callback function
            callback(null, json_list);
          });
      })
      .on('error', (error) => {
        console.error('Error fetching teacher data:', error);
        callback(error, null);
      });
  });
};

module.exports = { fetchData };

