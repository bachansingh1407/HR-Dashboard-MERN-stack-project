const mongoose = require('mongoose');
// models/Leave.js
const leaveSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
    documents: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Leave', leaveSchema);