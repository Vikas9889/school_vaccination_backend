// controllers/driveController.js
const { Drive, Student, VaccinationRecord } = require('../models');
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

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Student.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    const student = await Student.findByPk(id);
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch vaccination records for a student
exports.getVaccinationRecords = async (req, res) => {
  try {
    const { id } = req.params; // student id
    const records = await VaccinationRecord.findAll({
      where: { studentId: id },
      include: [{ model: Drive }],
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or update a vaccination record for a student
exports.addOrUpdateVaccinationRecord = async (req, res) => {
  try {
    const { studentId, driveId, vaccinatedAt } = req.body;
    let record = await VaccinationRecord.findOne({ where: { studentId, driveId } });
    if (record) {
      record.vaccinatedAt = vaccinatedAt;
      await record.save();
    } else {
      record = await VaccinationRecord.create({ studentId, driveId, vaccinatedAt });
    }
    // Optionally update student.vaccinated = true
    await Student.update({ vaccinated: true }, { where: { id: studentId } });
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
