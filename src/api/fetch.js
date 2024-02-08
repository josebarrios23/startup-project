const URL = import.meta.env.VITE_BASE_API_URL;

export function getAllUsers() {
  return fetch(`${URL}/users`).then((res) => res.json());
}

export function getOneUser(id) {
  return fetch(`${URL}/users/${id}`).then((res) => res.json());
}

export function submitApplicantForm(userId, position, newApplicant) {

  return fetch(`${URL}/users/${userId}`)
    .then((userResponse) => userResponse.json())
    .then((userData) => {
  
      if (!userData.project.positionsNeeded[position].applicantInfo) {
        userData.project.positionsNeeded[position].applicantInfo = [];
      }
      userData.project.positionsNeeded[position].applicantInfo.push(newApplicant);

      return fetch(`${URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
    });
}

export function editProjectFetch(userId, updatedProjectData) {
  return fetch(`${URL}/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        
          userData.project = {
              ...userData.project,
              ...updatedProjectData
          };

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

export const fetchUsersCount = async () => {
  const response = await fetch(`${URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.length; 
};

export const submitNewProject = async (projectData) => {
  const response = await fetch(`${URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

