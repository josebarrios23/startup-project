import { useState } from 'react'
// import { submitApplicantForm } from "../api/fetch";

const ApplicantForm = ({ projectId, positionId }) => {
  const [formData, setFormData] = useState({
      fullName: '',
      experience: '',
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

// The primary reason for the use of async in this code is that it involves asynchronous operations like sending a form submission to a server. The submitApplicantForm function performs an HTTP request to the server, which can take some time to complete. Using async/await, you can pause the execution of the function until this operation finishes without blocking the entire application.Here's what it does:

// const handleSubmit = async (e) => {
//   e.preventDefault(); // 1. Prevent the default form submission behavior

//   // 2. Construct the new applicant info object directly as the server expects
//   const newApplicantInfo = {
//       applicant: formData.fullName, // Get the full name from form data
//       hasExperience: formData.experience === 'yes', // Check if the user has experience and map it to true/false as expected by the server
//       termsAgreement: formData.terms, // Get the terms agreement from form data
//       email: formData.email, // Get the email from form data
//       comments: formData.comments, // Get the comments from form data
//   };

//   // 3. No need to fetch the current project data or modify the entire project structure
//   // Directly submit the new applicant info for the specific position

//   // 4. After constructing the `newApplicantInfo` object, the code calls the `submitApplicantForm` function with this data, along with `projectId` and `positionId`. It appears that this function sends a request to a server to submit the form data. It's likely an asynchronous operation, which is why the `async` keyword is used for the `handleSubmit` function.

//   submitApplicantForm(newApplicantInfo, projectId, positionId)
//       .then(data => {
//           // 5. A `.then()` block is used to handle the successful response from the server. If the submission is successful, it logs a success message to the console and resets the `formData` object to clear the form fields.
//           console.log('Form submitted successfully', data);
//           setFormData({ fullName: '', experience: '', email: '', comments: '', terms: false }); // Clear the form fields
//       })
//       .catch(error => {
//           // 5. If there is an error during the submission, it's caught in the `.catch()` block, and an error message is logged to the console.
//           console.error('Error submitting form:', error);
//       });
// };

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const projectUrl = `http://localhost:5001/api/projects/${projectId}`;
    const applicant = {
      fullName: formData.fullName,
      experience: formData.experience,
      email: formData.email,
      comments: formData.comments,
      terms: formData.terms,
    };

    try {
      // Fetch the current project data
      const projectResponse = await fetch(projectUrl);
      if (!projectResponse.ok) throw new Error('Failed to fetch project data.');

      const projectData = await projectResponse.json();
      // Update the project data with new applicant information
      // Assuming 'positionsNeeded' structure and that positionId is a key within it
      if (!projectData.project.positionsNeeded[positionId].applicantInfo) {
        projectData.project.positionsNeeded[positionId].applicantInfo = [];
      }
      projectData.project.positionsNeeded[positionId].applicantInfo.push(applicant);

      // PUT the updated project back to the server
      const updateResponse = await fetch(projectUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!updateResponse.ok) throw new Error('Failed to update project with new applicant.');

      console.log('Applicant added successfully');
      // Optionally, clear the form or navigate the user elsewhere
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
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

