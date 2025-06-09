import React, { useContext, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import "./authStyle.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

// Zod Schema for Validation
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
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
        className={error ? 'input-error' : ''}
      />
      {error && toast.error(error)}
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
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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

// Login Component
const Login = ({ setChange }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      setIsSubmitting(true);
      loginSchema.parse(formData);
      await login(formData.email, formData.password);
      toast.success("Login Successful");
      navigate('/');
    } catch (err) {
      toast.error('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = () => setChange(false);

  return (
    <>
      <Toaster />
      <div className="auth__form__container">
        <strong>Welcome to Dashboard</strong>
        <form onSubmit={handleSubmit}>
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="auth__change">
          Don't have an account? <button onClick={handlePageChange}>Register</button>
        </p>
      </div>
    </>
  );
};

export default Login;

