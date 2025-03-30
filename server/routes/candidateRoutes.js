const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Candidate = require('../models/candidateModel.js');
const { protect, isHR } = require('../middleware/authMiddleware.js');

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

// Create a candidate profile
router.post('/', protect, isHR, upload.single('resume'), async (req, res) => {
  const { fullName, email, phoneNumber, position, experience } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Resume is required' });
  }

  try {
    const candidate = new Candidate({
      name: fullName,
      email,
      phone: phoneNumber,
      position,
      status: 'New',
      experience,
      resume: req.file.path,
      createdBy: req.user._id,
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate profile created successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get candidates with filters
router.get('/', protect, isHR, async (req, res) => {
  const { position, status, experience } = req.query;
  const filter = {};

  if (position) filter.position = position;
  if (status) filter.status = status;
  if (experience) filter.experience = { $gte: experience };

  try {
    const candidates = await Candidate.find(filter);
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update candidate status
router.put('/:id/status', protect, isHR, async (req, res) => {
  const { status } = req.body;

  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.status = status;
    await candidate.save();
    res.json({ message: 'Candidate status updated successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete candidate
router.delete('/:id', protect, isHR, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Delete resume from storage
    if (fs.existsSync(candidate.resume)) {
      fs.unlinkSync(candidate.resume);
    }

    await candidate.deleteOne();
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download candidate resume
router.get('/:id/download', protect, isHR, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const resumePath = path.resolve(candidate.resume);
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.download(resumePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
