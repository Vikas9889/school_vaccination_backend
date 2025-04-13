const addStudent = (req, res) => {
    const { name, age, grade } = req.body;

    if (!name || !age || !grade) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    res.status(201).json({ message: 'Student added successfully', student: { name, age, grade } });
};

const getAllStudents = (req, res) => {
    res.status(200).json({ message: 'Retrieve all students' });
};

const updateStudent = (req, res) => {
    res.status(200).json({ message: 'Update student' });
};

const deleteStudent = (req, res) => {
    res.status(200).json({ message: 'Delete student' });
};

module.exports = {
    addStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
};
