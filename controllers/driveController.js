const { Drive, Student, VaccinationRecord } = require('../models');
const { Op } = require('sequelize');

// Create a vaccination drive
exports.createDrive = async (req, res) => {
  try {
    const { vaccineName, date, dosesAvailable, applicableClasses } = req.body;
    const driveDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    const diffDays = Math.ceil((driveDate - today) / (1000 * 60 * 60 * 24));

    // Enforce scheduling at least 15 days in advance
    if (diffDays < 15) {
      return res.status(400).json({ error: 'Drive must be scheduled at least 15 days in advance' });
    }

    // Prevent overlapping drives for the same date and any overlapping class
    // Split classes by comma, trim, and check for any overlap
    const classList = applicableClasses.split(',').map(cls => cls.trim());
    const overlapping = await Drive.findOne({
      where: {
        date: driveDate,
        [Op.or]: classList.map(cls => ({
          applicableClasses: { [Op.like]: `%${cls}%` }
        }))
      },
    });
    if (overlapping) {
      return res.status(400).json({ error: 'Overlapping drive already exists for one or more classes on this date' });
    }

    const drive = await Drive.create({ vaccineName, date: driveDate, dosesAvailable, applicableClasses });
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

// Edit a vaccination drive (only if not expired)
exports.updateDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const drive = await Drive.findByPk(id);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const driveDate = new Date(drive.date);
    driveDate.setHours(0, 0, 0, 0);
    if (driveDate < today) {
      return res.status(400).json({ error: 'Cannot edit a past/expired drive' });
    }
    await Drive.update(req.body, { where: { id } });
    res.json({ message: 'Drive updated successfully' });
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

// Get drive by ID (the missing function)
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

// Dashboard Overview API
exports.getDashboardData = async (req, res) => {
  try {
    // Efficiently get total and vaccinated student counts in parallel
    const [totalStudents, vaccinatedStudents] = await Promise.all([
      Student.count(),
      Student.count({ where: { vaccinated: true } })
    ]);
    const vaccinationPercentage = totalStudents === 0 ? 0 : (vaccinatedStudents / totalStudents) * 100;

    // Get upcoming drives in the next 30 days
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    const upcomingDrives = await Drive.findAll({
      where: {
        date: {
          [Op.between]: [today, nextMonth],
        },
      },
      order: [['date', 'ASC']],
    });

    res.json({
      totalStudents,
      vaccinatedStudents,
      vaccinationPercentage: Number(vaccinationPercentage.toFixed(2)),
      upcomingDrives,
      upcomingDrivesCount: upcomingDrives.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
