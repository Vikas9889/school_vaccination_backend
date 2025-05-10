// studentRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    addStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getVaccinationRecords,
    addOrUpdateVaccinationRecord,
    getStudentById
} = require('../controllers/studentController');

// Route to add a new student
// POST /api/v1/students
router.post('/v1/students', addStudent);

// Route to get all students
// GET /api/v1/students
router.get('/v1/students', getAllStudents);

// Route to get a student by ID
// GET /api/v1/students/:id
router.get('/v1/students/:id', getStudentById);

// Route to update a student by ID
// PUT /api/v1/students/:id
router.put('/v1/students/:id', updateStudent);

// Route to delete a student by ID
// DELETE /api/v1/students/:id
router.delete('/v1/students/:id', deleteStudent);

// Vaccination record routes
// GET /api/v1/students/:id/vaccination-records
router.get('/v1/students/:id/vaccination-records', getVaccinationRecords);
// POST /api/v1/students/vaccination-records
router.post('/v1/students/vaccination-records', addOrUpdateVaccinationRecord);

module.exports = router;
