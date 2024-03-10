// index.js

const express = require('express');
const connection = require('./config.js'); // Import the database connection

const app = express();
const PORT = 3000;

app.use(express.json());

// Route to get all students
app.get('/students', (req, res) => {
  // Query to retrieve all student data
  const query = 'SELECT * FROM students';

  // Execute the query
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Error fetching student data');
      return;
    }
    res.json(results); // Send the student data as JSON response
  });
});

app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;
  if (!name || !age || !grade) {
    res.status(400).send('Invalid request: Name, age, and grade are required.');
    return;
  }

  // Query to insert a new student
  const query = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';
  connection.query(query, [name, age, grade], (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Error adding student');
      return;
    }
    res.status(201).send('Student added successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
