// studentRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    addStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

// Route to add a new student
// POST /api/students
router.post('/', addStudent);

// Route to get all students
// GET /api/students
router.get('/', getAllStudents);

// Route to update a student by ID
// PUT /api/students/:id
router.put('/:id', updateStudent);

// Route to delete a student by ID
// DELETE /api/students/:id
router.delete('/:id', deleteStudent);

module.exports = router;
