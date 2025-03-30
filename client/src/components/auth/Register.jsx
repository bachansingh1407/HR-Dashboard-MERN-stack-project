import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import './authStyle.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Zod Schema for Validation
const registerSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Input Component
const Input = ({ label, type, name, value, onChange, placeholder, error }) => (
  <div className="input-group">
    <label className="input-label">{label}<span className="label">*</span></label>
    <div className="input">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={error ? 'input-error' : ''}
      />
      {error &&  toast.error(error)}
    </div>
  </div>
);

// Password Input Component
const PasswordInput = ({ label, name, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-group password-group">
      <label>{label} <span className="label">*</span></label>
      <div className="input">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={error ? 'input-error' : ''}
        />
        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <BiHide /> : <BiShow />}
        </span>
        {error && toast.error(error)}
      </div>
    </div>
  );
};

// Register Component
const Register = ({ setChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Zod Validation
      registerSchema.parse(formData);

      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      console.log('Registration successful:', response.data);
      toast.success('Registration Successful');
      setChange(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        console.error('Error:', error?.response?.data?.error || error.message);
        toast.error(error?.response?.data?.error || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = () => {
    setChange(true);
  };

  return (
    <>
      <Toaster />
      <div className="auth__form__container">
        <strong>Welcome to Dashboard</strong>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
        </form>

        <p className="auth__change">
          Already have an account? <button onClick={handlePageChange}>Login</button>
        </p>
      </div>
    </>
  );
};

export default Register;
