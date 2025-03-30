const express = require('express');
const Leave = require('../models/leaveModel');
const Employee = require('../models/employeeModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, isHR } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Apply for Leave

router.post('/apply', protect, isHR, upload.single('document'), async (req, res) => {
  const { employeeId, date, reason } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Document is required' });
  }

  try {
    const leave = new Leave({
      employee: employeeId,
      date,
      reason,
      documents: req.file.path,
    });

    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully', leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Get Leaves
router.get('/', protect, async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee', 'name position department');
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Update Leave Status
router.patch('/:id', protect, isHR, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Leave.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: 'Leave status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Search Employees
router.get('/search', protect, async (req, res) => {
  const { query } = req.query;

  try {
    const employees = await Employee.find({
      name: new RegExp(query, 'i'),
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
