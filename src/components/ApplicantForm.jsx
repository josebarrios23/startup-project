import React, { useState } from 'react';
import { submitApplicantForm } from '../api/fetch';

const ApplicantForm = ({ userId, position }) => {
  const [formData, setFormData] = useState({
    applicant: '',
    hasExperience: false,
    termsAgreement: false,
    email: '',
    comments: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitApplicantForm(userId, position, formData)
      .then(() => {
        alert('Application submitted successfully!');
      })
      .catch((error) => {
        alert('Failed to submit application. Please try again.');
      });
  };

  return (
    <section className="application-form">
      <h2>Applicant Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="applicant">Applicant Name:</label>
        <input type="text" name="applicant" id="applicant" value={formData.applicant} onChange={handleChange} required />

        <label htmlFor="hasExperience">Has Experience:</label>
        <input type="checkbox" name="hasExperience" id="hasExperience" checked={formData.hasExperience} onChange={handleChange} />

        <label htmlFor="termsAgreement">Agree to Terms:</label>
        <input type="checkbox" name="termsAgreement" id="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} required />

        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="comments">Comments:</label>
        <textarea name="comments" id="comments" value={formData.comments} onChange={handleChange} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ApplicantForm;
