// app.js
const express = require('express');
const bodyParser = require('body-parser');
const driveRoutes = require('./routes/driveRoutes');  // Import routes
//const sequelize = require('./config/db');  // Import Sequelize connection



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

//app.use(express.json());
// API Routes
//app.use(driveRoutes)
app.use('/api/drives', driveRoutes);  // Mount the drive routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
