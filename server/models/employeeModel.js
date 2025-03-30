const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: {
      type: String,
      enum: ['Intern', 'Full Time', 'Junior', 'Senior', 'Team Lead'],
      required: true,
    },
    department: {
      type: String,
      enum: ['Designer', 'Backend Development', 'Frontend Development', 'Human Resource'],
      default: 'Human Resource',
    },
    experience: { type: Number, required: true },
    joiningDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;
