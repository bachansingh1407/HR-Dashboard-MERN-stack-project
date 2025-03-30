const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ['Designer', 'Developer', 'Human Resource'],
      required: true,
    },
    status: {
      type: String,
      enum: ['New', 'Scheduled', 'Ongoing', 'Selected', 'Rejected'],
      default: 'New',
    },
    experience: {
      type: Number,
      required: true,
    },
    resume: {
      type: String, // Path or URL of the uploaded resume (PDF)
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model('candidates', candidateSchema);
module.exports = Candidate;
