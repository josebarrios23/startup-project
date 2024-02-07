import { useState } from 'react';
import { createProject } from '../api/fetch';
import "../App.css"

const CreateProject = ({ userId }) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    fullDescription: '',
    positions: [], // Changed to an array to handle multiple positions
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('position_')) {
      const index = parseInt(name.split('_')[1], 10);
      const fieldName = name.split('_')[2];
      setFormData((prevFormData) => {
        const newPositions = [...prevFormData.positions];
        if (!newPositions[index]) newPositions[index] = { payPerHour: "", workDuration: "", experience: "" };
        newPositions[index][fieldName] = value;
        return { ...prevFormData, positions: newPositions };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const addPosition = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      positions: [...prevFormData.positions, { payPerHour: "", workDuration: "", experience: "" }]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProjectData = {
      projectTitle: formData.projectTitle,
      projectDescription: formData.projectDescription,
      fullDescription: formData.fullDescription,
      positionsNeeded: formData.positions.reduce((acc, cur, index) => {
        const positionKey = `position${index + 1}`; // Dynamically create a position key
        acc[positionKey] = { ...cur, applicantCount: 0, applicantInfo: [] };
        return acc;
      }, {})
    };

    createProject(userId, newProjectData)
      .then(() => {
        alert('Project created successfully!');
      })
      .catch((error) => {
        alert('Failed to create project. Please try again.');
        console.error(error);
      });
  };

  return (
    <section className="edit-project-form">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectTitle">Project Title:</label>
        <input type="text" name="projectTitle" id="projectTitle" value={formData.projectTitle} onChange={handleInputChange} />

        <label htmlFor="projectDescription">Project Description:</label>
        <textarea name="projectDescription" id="projectDescription" value={formData.projectDescription} onChange={handleInputChange}></textarea>

        {/* extra thing? */}
        {/* <label htmlFor="fullDescription">Full Description:</label>
        <textarea name="fullDescription" id="fullDescription" value={formData.fullDescription} onChange={handleInputChange}></textarea> */}

        {formData.positions.map((position, index) => (
          <div key={index}>
            <h3>Position {index + 1}:</h3>
            <label>Pay Per Hour (in dollars):</label>
            <input type="text" name={`position_${index}_payPerHour`} value={position.payPerHour} onChange={handleInputChange} />

            <label>Work Duration (in weeks):</label>
            <input type="text" name={`position_${index}_workDuration`} value={position.workDuration} onChange={handleInputChange} />

            <label>Experience (in years):</label>
            <input type="text" name={`position_${index}_experience`} value={position.experience} onChange={handleInputChange} />
          </div>
        ))}
        <button type="button" onClick={addPosition}>Add Another Position</button>
        <button type="submit">Create Project</button>
      </form>
    </section>
  );
};

export default CreateProject;

