import { useState } from 'react'
import { submitApplicantForm } from "../api/fetch";

// Adjust ApplicantForm to accept props
const ApplicantForm = ({ projectId, positionId }) => {
  const [formData, setFormData] = useState({
      fullName: '',
      experience: '', // Use an empty string to represent no selection
      email: '',
      comments: '',
      terms: false,
  });

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === 'experience') {
          const experienceValue = value === 'yes' ? true : value === 'no' ? false : '';
          setFormData({
              ...formData,
              [name]: experienceValue,
          });
      } else {
          setFormData({
              ...formData,
              [name]: type === 'checkbox' ? checked : value,
          });
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // Adjust the function call to include projectId and positionId
      submitApplicantForm(formData, projectId, positionId)
          .then(data => {
              console.log('Form submitted successfully', data);
              // Reset form or redirect as needed
              setFormData({ fullName: '', experience: '', email: '', comments: '', terms: false });
          })
          .catch(error => {
              console.error('Error submitting form:', error);
          });
  };

  return (
      <section className="application-form">
          <h2>Applicant Form</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="fullName">Applicant Full Name:</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required />

              <label htmlFor="experience">Experience:</label>
              <select name="experience" id="experience" value={formData.experience === true ? "yes" : formData.experience === false ? "no" : ""} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
              </select>

              <label htmlFor="email">E-mail:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

              <label htmlFor="comments">Comments:</label>
              <textarea name="comments" id="comments" value={formData.comments} onChange={handleChange} required></textarea>

              <label htmlFor="terms">Terms and Conditions:</label>
              <input type="checkbox" name="terms" id="terms" checked={formData.terms} onChange={handleChange} required />

              <button type="submit">Submit</button>
          </form>
      </section>
  );
};

export default ApplicantForm;

