// AddLeaveModel Component
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

const leaveSchema = z.object({
  employeeName: z.string().min(1, 'Employee Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  leaveDate: z.string().min(1, 'Leave Date is required'),
  reason: z.string().min(1, 'Reason is required'),
  documents: z.any().optional(),
});

const AddLeaveModel = ({ onClose }) => {
  const { token } = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(leaveSchema),
  });

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue('documents', e.target.files);
    } else {
      setSelectedFileName('');
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, key === 'documents' ? data.documents[0] : data[key]);
      }

      await axios.post('http://localhost:5000/api/leaves/apply', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Leave Applied Successfully');
      onClose();
    } catch (error) {
      toast.error('Error applying leave');
    }
  };

  return (
    <>
      <Toaster />
      <div className="modal__overlay">
        <div className="modal__content">
          <div className="modal__title">
            <h2>Add New Leave</h2>
            <button onClick={onClose}><IoClose /></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__submittion">
              <div className="two__input">
                <InputField label="Employee Name" type="text" name="employeeName" register={register} error={errors.employeeName} placeholder="Search Employee Name" />
                <InputField label="Designation" type="text" name="designation" register={register} error={errors.designation} placeholder="Designation" />
              </div>
              <div className="two__input">
                <InputField label="Leave Date" type="date" name="leaveDate" register={register} error={errors.leaveDate} placeholder="Leave Date" />

                <div className="input-group">
                  <label>Documents</label>
                  <div className="input">
                    <div className="file-upload">
                      <input type="file" id="file__input" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                      <label htmlFor="file__input" className="file-label">{selectedFileName || 'Choose File'}</label>
                    </div>
                  </div>
                </div>
              </div>
              <InputField label="Reason" type="text" name="reason" register={register} error={errors.reason} placeholder="Reason" />
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLeaveModel;
