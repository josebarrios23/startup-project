const URL = import.meta.env.VITE_BASE_API_URL;

export function getAllUsers() {
  return fetch(`${URL}/users`).then((res) => res.json());
}

export function getOneUser(id) {
  return fetch(`${URL}/users/${id}`).then((res) => res.json());
}

export function submitApplicantForm(userId, position, newApplicant) {
  // Step 1: Retrieve the current user object
  return fetch(`${URL}/users/${userId}`)
    .then((userResponse) => userResponse.json())
    .then((userData) => {
      // Step 2: Update the applicantInfo array
      if (!userData.project.positionsNeeded[position].applicantInfo) {
        userData.project.positionsNeeded[position].applicantInfo = [];
      }
      userData.project.positionsNeeded[position].applicantInfo.push(newApplicant);

      // Step 3: Send the updated user object back with a PUT request
      return fetch(`${URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
    });
}

export function editProject(userId, updatedProjectData) {
  return fetch(`${URL}/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
          // Update the entire project object
          userData.project = {
              ...userData.project,
              ...updatedProjectData
          };

          // Send the updated user object back with a PUT request
          return fetch(`${URL}/users/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
          }).then((res) => res.json());
      });
}

export function deleteUser(userId) {
  return fetch(`${URL}/users/${userId}`, {
    method: 'DELETE',
  });
}

// export function createProject(userId, updatedProjectData) {
//   return fetch(`${URL}/users/${userId}`)
//   .then((response) => response.json())
//   .then((userData) => {
//       // Update the entire project object
//       userData.project = {
//           ...userData.project,
//           ...updatedProjectData
//       };

//       return fetch(`${URL}/users/${userId}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//       }).then((res) => res.json());
//   });
// }

export function createProject(userId, newProjectData) {
  return fetch(`${URL}/users/${userId}`)
    .then((response) => response.json())
    .then((userData) => {
        // Assuming userData.project is an object with projects keyed by their titles or IDs
        const projectKey = newProjectData.projectTitle; // Or any unique identifier for the project
        const updatedProjects = {
            ...userData.project, // Keep existing projects
            [projectKey]: newProjectData // Add the new project
        };

        // Now, userData.project contains the existing projects plus the new one
        userData.project = updatedProjects;

        return fetch(`${URL}/users/${userId}`, {
            method: 'PUT', // Use PUT for updating existing resources
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }).then((res) => res.json());
    });
}


