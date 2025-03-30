const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  attendanceRecord,
  updateAttendaceStatus
} = require("../controllers/employeeController");

// Create Employee
router.post("/", createEmployee);
// Get All Employees
router.get("/", getAllEmployee);
// Get Employee by ID
router.get("/:id", getEmployeeById);
// Update Employee
router.put("/:id", updateEmployeeById);
// Delete Employee
router.delete("/:id", deleteEmployeeById);
// Attendace Record  
router.get('/attendance', attendanceRecord);
// API to update attendance status
router.put('/api/attendance/:id', updateAttendaceStatus)

module.exports = router;
