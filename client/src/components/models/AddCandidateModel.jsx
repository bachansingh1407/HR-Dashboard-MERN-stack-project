// AddCandidateModel Component
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import './modelStyle.css'
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from '../../context/authContext';

// Reusable InputField Component
const InputField = ({ label, type, name, register, error, placeholder, ...rest }) => {
  return (
    <div className="input-group">
      <label>{label}<span>*</span></label>
      <div className="input">
        <input type={type} placeholder={placeholder} {...register(name)} {...rest} />
      </div>
      {error && toast.error(error.message)}
    </div>
  );
};

const candidateSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone Number must be valid'),
  position: z.string().min(1, 'Position is required'),
  experience: z.string().min(1, 'Experience is required'),
  resume: z.any().refine(file => file?.length > 0, 'Resume is required'),
});

const AddCandidateModel = ({ onClose }) => {

  const {token} = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(candidateSchema),
  });

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue('resume', e.target.files);
    } else {
      setSelectedFileName('');
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, key === 'resume' ? data.resume[0] : data[key]);
      }

      await axios.post('http://localhost:5000/api/candidates', formData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Candidate Added Successfully');
      onClose();
    } catch (error) {
      toast.error('Error adding candidate');
    }
  };

  return (
    <>
      <Toaster />
    <div className="modal__overlay">
      <div className="modal__content">
        <div className="modal__title">
          <h2>Add New Candidate</h2>
          <button onClick={onClose}><IoClose /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__submittion">
            <div className="two__input">
              <InputField label="Full Name" type="text" name="fullName" register={register} error={errors.fullName} placeholder="Full Name" />
              <InputField label="Email Address" type="email" name="email" register={register} error={errors.email} placeholder="Email Address" />
            </div>
            <div className="two__input">
              <InputField label="Phone Number" type="text" name="phoneNumber" register={register} error={errors.phoneNumber} placeholder="Phone Number" />
              <InputField label="Position" type="text" name="position" register={register} error={errors.position} placeholder="Position" />
            </div>
            <div className="two__input">
              <InputField label="Experience" type="text" name="experience" register={register} error={errors.experience} placeholder="Experience" />

              <div className="input-group">
                <label>Resume <span>*</span></label>
                <div className="input">
                  <div className="file-upload">
                    <input type="file" id="file__input" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                    <label htmlFor="file__input" className="file-label">{selectedFileName || 'Choose File'}</label>
                  </div>
                </div>
                {errors.resume && toast.error(errors.resume.message)}
              </div>
            </div>

            <div className="input-group-checkbox">
              <input type="checkbox" id="checkbox__input" {...register('confirmation')} />
              <label htmlFor='checkbox__input'>I hereby declare that the above information is true to the best of my knowledge and belief</label>
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddCandidateModel;
