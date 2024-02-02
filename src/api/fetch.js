const URL = import.meta.env.VITE_BASE_API_URL;

export function getAllUsers() {
  return fetch(`${URL}/users`).then((res) => res.json());
}

export function getOneUser(id) {
  return fetch(`${URL}/users/${id}`).then((res) => res.json());
}

export function submitApplicantForm (formData, projectId, positionId) {
  const url = `http://localhost:5001/api/projects/${projectId}/positions/${positionId}/applicants`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  });
};