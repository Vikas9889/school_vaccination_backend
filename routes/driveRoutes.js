const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');

// Drive Management
router.post('/', driveController.createDrive);
router.get('/', driveController.getDrives);
router.get('/upcoming', driveController.getUpcomingDrives);
router.put('/:id', driveController.updateDrive);
router.get('/:id', driveController.getDriveById);

module.exports = router;
