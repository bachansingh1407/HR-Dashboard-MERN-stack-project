// server/server.js
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const candidateRoutes = require("./routes/candidateRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const leaveRoutes = require("./routes/leaveRoute");

// Adding .env file and database file
require('dotenv').config()
connectDB();

const app = express();
app.use(cors(
  {
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
  }
));
app.use(cookieParser());
app.use(express.json());


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
