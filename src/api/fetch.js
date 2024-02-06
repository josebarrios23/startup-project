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

export function createProject(projectData) {
  return fetch('[Your API Endpoint]/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData)
  })
  .then(response => {
    if (!response.ok) {
      console.error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

