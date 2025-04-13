const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const driveRoutes = require('./routes/driveRoutes');

app.use(express.json());  // Middleware to parse JSON requests

app.use('/api', studentRoutes);  // Mount student routes at /api
app.use('/api', driveRoutes);    // Mount drive routes at /api

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
