import { useState, useEffect } from 'react';
import { fetchUsersCount, submitNewProject } from '../api/fetch';
import "../App.css"

const CreateProject = ({ selectedUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    projectTitle: '',
    projectDescription: '',
    fullDescription: '',
    positions: [],
  });

  useEffect(() => {
    fetchUsersCount().then(count => {
      setFormData(prevFormData => ({ ...prevFormData, id: count + 1 }));
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('position_')) {
      const index = parseInt(name.split('_')[1], 10);
      const fieldName = name.split('_')[2];
      setFormData(prevFormData => {
        const newPositions = [...prevFormData.positions];
        if (!newPositions[index]) {
          newPositions[index] = { positionName: "", payPerHour: "", workDuration: "", experience: "" };
        }
        newPositions[index][fieldName] = value;
        return { ...prevFormData, positions: newPositions };
      });
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }
  };

  const addPosition = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      positions: [...prevFormData.positions, { positionName: "", payPerHour: "", workDuration: "", experience: "" }]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProjectData = {
      id: formData.id.toString(),
      user: selectedUser,
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      project: {
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        positionsNeeded: formData.positions.reduce((acc, cur, index) => {
          const positionName = cur.positionName || `position${index + 1}`;
          acc[positionName] = {
            payPerHour: cur.payPerHour,
            workDuration: cur.workDuration,
            experience: cur.experience,
            applicantInfo: []
          };
          return acc;
        }, {}),
        fullDescription: formData.fullDescription,
      }
    };

    submitNewProject(newProjectData)
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
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} />

        <label htmlFor="projectTitle">Project Title:</label>
        <input type="text" name="projectTitle" id="projectTitle" value={formData.projectTitle} onChange={handleInputChange} />

        <label htmlFor="projectDescription">Project Description:</label>
        <textarea name="projectDescription" id="projectDescription" value={formData.projectDescription} onChange={handleInputChange}></textarea>

        <label htmlFor="fullDescription">Full Description:</label>
        <textarea name="fullDescription" id="fullDescription" value={formData.fullDescription} onChange={handleInputChange}></textarea>

        {formData.positions.map((position, index) => (
          <div key={index}>
            <label>Position Name:</label>
            <input type="text" name={`position_${index}_positionName`} value={position.positionName} onChange={handleInputChange} />

            <label>Pay Per Hour (in dollars):</label>
            <input type="text" name={`position_${index}_payPerHour`} value={position.payPerHour} onChange={handleInputChange} />

            <label>Work Duration (in weeks):</label>
            <input type="text" name={`position_${index}_workDuration`} value={position.workDuration} onChange={handleInputChange} />

            <label>Experience (in years):</label>
            <input type="text" name={`position_${index}_experience`} value={position.experience} onChange={handleInputChange} />
          </div>
        ))}
        <button type="button" onClick={addPosition}>Add Position</button>
        <button type="submit">Create Project</button>
      </form>
    </section>
  );
};

export default CreateProject;