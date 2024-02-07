import React, { useState, useEffect } from 'react';
import { editProject, getOneUser } from '../api/fetch';

const EditProject = ({ userId }) => {
  const [formData, setFormData] = useState({
    projectId: '', // Assuming projectId is part of your project data
    projectTitle: '',
    projectDescription: '',
    fullDescription: '',
    newPositionKey: '',
    newPayPerHour: '',
    newWorkDuration: '',
    newExperience: '',
    positionsNeeded: {} // Assuming this structure to handle existing positions
  });

  useEffect(() => {
    getOneUser(userId)
      .then((data) => {
        setFormData({
          projectId: data.project.projectId,
          projectTitle: data.project.projectTitle,
          projectDescription: data.project.projectDescription,
          fullDescription: data.project.fullDescription,
          positionsNeeded: data.project.positionsNeeded // Handle existing positions
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProjectData = {
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        fullDescription: formData.fullDescription,
        positionsNeeded: {
            ...formData.positionsNeeded,
            ...(formData.newPositionKey && {
                [formData.newPositionKey]: {
                    payPerHour: formData.newPayPerHour,
                    workDuration: formData.newWorkDuration,
                    experience: formData.newExperience,
                    applicantInfo: []
                }
            })
        }
    };

    editProject(userId, updatedProjectData)
      .then(() => {
        alert('Project details updated successfully!');
      })
      .catch((error) => {
        alert('Failed to update project details. Please try again.');
      });
};

  return (
    <section className="edit-project-form">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for project details */}
        <label htmlFor="projectTitle">Project Title:</label>
        <input type="text" name="projectTitle" id="projectTitle" value={formData.projectTitle} onChange={handleChange} />

        <label htmlFor="projectDescription">Project Description:</label>
        <textarea name="projectDescription" id="projectDescription" value={formData.projectDescription} onChange={handleChange}></textarea>

        <label htmlFor="fullDescription">Full Description:</label>
        <textarea name="fullDescription" id="fullDescription" value={formData.fullDescription} onChange={handleChange}></textarea>

        {/* Form fields for adding a new position */}
        <h3>Add New Position:</h3>
        <label htmlFor="newPositionKey">Position Key:</label>
        <input type="text" name="newPositionKey" id="newPositionKey" value={formData.newPositionKey} onChange={handleChange} />

        <label htmlFor="newPayPerHour">Pay Per Hour:</label>
        <input type="text" name="newPayPerHour" id="newPayPerHour" value={formData.newPayPerHour} onChange={handleChange} />

        <label htmlFor="newWorkDuration">Work Duration:</label>
        <input type="text" name="newWorkDuration" id="newWorkDuration" value={formData.newWorkDuration} onChange={handleChange} />

        <label htmlFor="newExperience">Experience:</label>
        <input type="text" name="newExperience" id="newExperience" value={formData.newExperience} onChange={handleChange} />

        <button type="submit">Update Project</button>
      </form>
    </section>
  );
};

export default EditProject;
