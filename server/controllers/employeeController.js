const express = require('express');
const Employee = require('../models/employeeModel');

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Employees
const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Employee
const updateEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete Employee
const deleteEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  // Update attendance status
const attendanceRecord = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateAttendaceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  attendanceRecord,
  updateAttendaceStatus
}
