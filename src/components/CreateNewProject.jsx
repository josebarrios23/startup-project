// import React, { useState } from 'react';
// import { createProject } from '../api/fetch'; // Ensure this import matches your project structure

// const CreateNewProject = ({ selectedUser }) => {
//   const [formData, setFormData] = useState({
//     projectTitle: '',
//     projectDescription: '',
//     fullDescription: '',
//     positionsNeeded: {}
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   const handlePositionChange = (positionKey, attribute, value) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       positionsNeeded: {
//         ...prevFormData.positionsNeeded,
//         [positionKey]: {
//           ...prevFormData.positionsNeeded[positionKey],
//           [attribute]: value
//         }
//       }
//     }));
//   };

//   const handleAddPosition = () => {
//     const newPositionKey = `position${Object.keys(formData.positionsNeeded).length + 1}`;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       positionsNeeded: {
//         ...prevFormData.positionsNeeded,
//         [newPositionKey]: {
//           payPerHour: '',
//           workDuration: '',
//           experience: '',
//           applicantCount: 0,
//           applicantInfo: []
//         }
//       }
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (selectedUser) {
//       const newProjectData = {
//         user: selectedUser,
//         name: { firstName: '', lastName: '' },
//         project: {
//           ...formData
//         }
//       };

//       createProject(newProjectData)
//         .then(() => {
//           alert('New project created successfully!');
//         })
//         .catch(error => {
//           alert('Failed to create a new project. Please try again.');
//         });
//     }
//   };

//   if (!selectedUser) {
//     return null;
//   }

//   return (
//     <section className="create-new-project-form">
//       <h2>Create New Project</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="projectTitle">Project Title:</label>
//         <input type="text" name="projectTitle" id="projectTitle" value={formData.projectTitle} onChange={handleChange} />

//         <label htmlFor="projectDescription">Project Description:</label>
//         <textarea name="projectDescription" id="projectDescription" value={formData.projectDescription} onChange={handleChange}></textarea>

//         <label htmlFor="fullDescription">Full Description:</label>
//         <textarea name="fullDescription" id="fullDescription" value={formData.fullDescription} onChange={handleChange}></textarea>

//         {/* Dynamic fields for positionsNeeded */}
//         {Object.entries(formData.positionsNeeded).map(([positionKey, position]) => (
//           <div key={positionKey}>
//             <h3>{positionKey}</h3>
//             <label htmlFor={`${positionKey}-payPerHour`}>Pay Per Hour:</label>
//             <input type="number" name={`${positionKey}-payPerHour`} id={`${positionKey}-payPerHour`} value={position.payPerHour} onChange={(e) => handlePositionChange(positionKey, 'payPerHour', e.target.value)} />

//             <label htmlFor={`${positionKey}-workDuration`}>Work Duration:</label>
//             <input type="text" name={`${positionKey}-workDuration`} id={`${positionKey}-workDuration`} value={position.workDuration} onChange={(e) => handlePositionChange(positionKey, 'workDuration', e.target.value)} />

//             <label htmlFor={`${positionKey}-experience`}>Experience:</label>
//             <input type="text" name={`${positionKey}-experience`} id={`${positionKey}-experience`} value={position.experience} onChange={(e) => handlePositionChange(positionKey, 'experience', e.target.value)} />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddPosition}>Add New Position</button>

//         <button type="submit">Create Project</button>
//       </form>
//     </section>
//   );
// };

// export default CreateNewProject;
