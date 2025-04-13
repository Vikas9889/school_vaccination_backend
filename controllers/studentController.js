// controllers/driveController.js
const { Drive } = require('../models');
const { Op } = require('sequelize');

// Create a vaccination drive
exports.createDrive = async (req, res) => {
  try {
    const { vaccineName, date, dosesAvailable, applicableClasses } = req.body;
    const driveDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((driveDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 15) {
      return res.status(400).json({ error: 'Drive must be scheduled at least 15 days in advance' });
    }

    const overlapping = await Drive.findOne({
      where: {
        date: driveDate,
        applicableClasses: {
          [Op.like]: `%${applicableClasses}%`, // Check for partial overlap
        },
      },
    });

    if (overlapping) {
      return res.status(400).json({ error: 'Overlapping drive already exists' });
    }

    const drive = await Drive.create(req.body);
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get upcoming drives
exports.getUpcomingDrives = async (req, res) => {
  try {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    const drives = await Drive.findAll({
      where: {
        date: {
          [Op.between]: [today, nextMonth],
        },
      },
    });

    res.json(drives.length > 0 ? drives : { message: 'No upcoming drives' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all drives
exports.getDrives = async (req, res) => {
  try {
    const drives = await Drive.findAll();
    res.status(200).json(drives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get drive by ID
exports.getDriveById = async (req, res) => {
  try {
    const { id } = req.params;
    const drive = await Drive.findByPk(id);

    if (!drive) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    res.json(drive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a vaccination drive
exports.updateDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const drive = await Drive.findByPk(id);

    if (!drive) return res.status(404).json({ error: 'Drive not found' });

    const today = new Date();
    const driveDate = new Date(drive.date);

    if (driveDate < today) {
      return res.status(400).json({ error: 'Cannot edit a past drive' });
    }

    await Drive.update(req.body, { where: { id } });
    res.json({ message: 'Drive updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
