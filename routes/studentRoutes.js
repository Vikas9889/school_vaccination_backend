const express = require('express');
const router = express.Router();

// Import the controller functions
const { addStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

// Define your routes and attach the respective controller functions
// POST: Add a new student
router.post('/students', addStudent); 

// GET: Retrieve all students
router.get('/students', getAllStudents); 

// PUT: Update a student's information (based on student ID)
router.put('/students/:id', updateStudent); 

// DELETE: Remove a student (based on student ID)
router.delete('/students/:id', deleteStudent);

module.exports = router;
