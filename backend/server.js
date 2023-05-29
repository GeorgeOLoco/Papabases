const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { fetchData: fetchUsers } = require('./api/all_users');
const { fetchData: fetchStudents } = require('./api/allstudents');
const { fetchData: fetchTeachers } = require('./api/allteachers');
const { fetchData: fetchHandlers } = require('./api/allhandlers');
const { fetchData: fetchSchools } = require('./api/all_schools');
const { fetchData: fetchAuthors } = require('./api/all_authors'); 
const { fetchData: fetchBooks } = require('./api/all_books'); 
const { fetchData: fetchRents } = require('./api/all_rents');
const { fetchData: fetchTeacherLoans } = require('./api/teacher_loans');
const { fetchData: fetchTeachersAuthors } = require('./api/authors_teachers_category');
const { fetchData: fetchZeroRentAuthors } = require('./api/zero_rent_authors');
const { fetchData: fetchTopCategoryCombos } = require('./api/top_category_combos');
const { fetchData: fetchAuthLessThanFive } = require('./api/authors_less_than_five');
const { fetchData: fetchBooksRentedByUser } = require('./api/books_rented_by_user');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { addData: addUser } = require('./api/adduser');
const { addData: addTeacher } = require('./api/addteacher');
const { addData: addStudent } = require('./api/addstudent');
const { addData: addHandler } = require('./api/addhandler');
const { addData: addAuthor } = require('./api/addauthor');
const { addData: addCategory } = require('./api/addcategory');
const { addData: addReview } = require('./api/addreview');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Define a route handler for /all_users
app.get('/all_users', (req, res) => {
  fetchUsers((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allstudents
app.get('/allstudents', (req, res) => {
  fetchStudents((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allteachers
app.get('/allteachers', (req, res) => {
  fetchTeachers((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /allhandlers
app.get('/allhandlers', (req, res) => {
  fetchHandlers((err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /all_schools
app.get('/all_schools', (req, res) => {
  fetchSchools((err, results) => {
    if (err) {
      console.error('Error fetching school data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /all_authors
app.get('/all_authors', (req, res) => {
  fetchAuthors((err, results) => {
    if (err) {
      console.error('Error fetching author data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});



// Define a route handler for /all_Books
app.get('/all_books/:id', (req, res) => {
  const schoolId = req.params.id; // Get the school ID from the request parameters

  fetchBooks(schoolId, (err, results) => {
    if (err) {
      console.error('Error fetching Book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /all_rents
app.get('/all_rents/:year/:month', (req, res) => {
  const rent_year = req.params.year; // Get the year and month from the request parameters
  const rent_month = req.params.month;

  fetchRents([rent_year, rent_month], (err, results) => {
    if (err) {
      console.error('Error fetching Rent data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


// Define a route handler for /teacher_loans
app.get('/teacher_loans', (req, res) => {
  fetchTeacherLoans((err, results) => {
    if (err) {
      console.error('Error fetching user and rent data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /authors_teachers_category
app.get('/teachers_authors/:category', (req, res) => {
  const Category = req.params.category; // Get the category from the request parameters

  fetchTeachersAuthors(Category, (err, results) => {
    if (err) {
      console.error('Error fetching authors, teachers and category data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /zero_rent_authors
app.get('/zero_rent_authors', (req, res) => {
  fetchZeroRentAuthors((err, results) => {
    if (err) {
      console.error('Error fetching author and rent data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /top_category_combos
app.get('/top_category_combos', (req, res) => {
  fetchTopCategoryCombos((err, results) => {
    if (err) {
      console.error('Error fetching category data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /authors_less_than_five
app.get('/authors_less_than_five', (req, res) => {
  fetchAuthLessThanFive((err, results) => {
    if (err) {
      console.error('Error fetching author data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for /books rented by user
app.get('/books_rented_by_user/:id', (req, res) => {
  const userid = req.params.id; // Get the school ID from the request parameters

  fetchBooksRentedByUser(userid, (err, results) => {
    if (err) {
      console.error('Error fetching Book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Define a route handler for adding a user
app.get('/adduser/:username/:password/:user_name/:birthday/:email', (req, res) => {
  const { username, password, user_name, birthday, email } = req.params; // Get the user data from the request body

  addUser(username, password, user_name, birthday, email, (err, result) => {
    if (err) {
      console.error('Error adding teacher:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('User added successfully');
  });
});


// Define a route handler for adding a student
app.get('/addstudent/:userid/:schoolid', (req, res) => {
  const { userid, schoolid } = req.params; // Get the user data from the request body

  addStudent(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Student added successfully');
  });
});

// Define a route handler for adding a teacher
app.get('/addteacher/:userid/:schoolid', (req, res) => {//vazume to userid ke school id mesa sto teacher table 
  const { userid, schoolid } = req.params; // Get the user data from the request body
  addTeacher(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Teacher added successfully');
  });
});

app.get('/addhandler/:userid/:schoolid', (req, res) => {
  const { userid, schoolid } = req.params; // Get the user data from the request body

  addHandler(userid, schoolid, (err, result) => {
    if (err) {
      console.error('Error adding handler:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Hnadler added successfully');
  });
});

// Define a route handler for adding an author
app.get('/addauthor/:authorname', (req, res) => {
  const { authorname } = req.params; // Get the user data from the request body
  addAuthor(authorname, (err, result) => {
    if (err) {
      console.error('Error adding author:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    res.status(200).send('Author added successfully');
  });
});

// Define a route handler for adding an category
app.get('/addcategory/:categoryname', (req, res) => {
  const { categoryname } = req.params; // Get the user data from the request body
  addCategory(categoryname, (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Category added successfully');
  });
});

// Define a route handler for adding a review
app.get('/addreview/:userid/:schoolid/:isbn/:comments/:likert', (req, res) => {//vazume to userid,school id ke isbn mesa sto review table 
  const { userid, schoolid, isbn, comments, likert} = req.params; // Get the user data from the request body
  addReview(userid, schoolid, isbn, comments, likert,  (err, result) => {
    if (err) {
      console.error('Error adding review:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Review added successfully');
  });
});

// Start the server
const port = 3305;
//const ipAddress = '192.168.1.31';
app.listen(port, () => {//ipAddress, 
  console.log(`Server is running on ${port}`);//${ipAddress}:
});