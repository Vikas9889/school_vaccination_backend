// routes/driveRoutes.js
const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');

// Drive Management
router.post('/', driveController.createDrive);      // Create a new drive
router.get('/', driveController.getDrives);         // Get all drives
router.get('/upcoming', driveController.getUpcomingDrives);  // Get upcoming drives
router.put('/:id', driveController.updateDrive);    // Update a drive
router.get('/dashboard', driveController.getDashboardData); // Dashboard aggregate data
router.get('/:id', driveController.getDriveById);   // Get a drive by ID

// Alias for vaccination drives (GET all, POST new)
router.get('/v1/vaccination-drives', driveController.getDrives); // Get all drives
router.post('/v1/vaccination-drives', driveController.createDrive); // Create a new drive

// Alias for summary report (dashboard)
router.get('/v1/vaccination-reports', driveController.getDashboardData); // Generate summary report

module.exports = router;
