const express = require('express');
const app = express();
const { fetchData: fetchUsers } = require('./api/allusers');
const { fetchData: fetchSchools } = require('./api/all_schools');

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

// Start the server
const port = 3305;
const ipAddress = '192.168.1.31';
app.listen(port, ipAddress, () => {
  console.log(`Server is running on ${ipAddress}:${port}`);
});