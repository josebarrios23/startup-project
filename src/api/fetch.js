const URL = import.meta.env.VITE_BASE_API_URL;

export function getAllUsers() {
  return fetch(`${URL}/users`).then((res) => res.json());
}

export function getOneUser(id) {
  return fetch(`${URL}/users/${id}`).then((res) => res.json());
}

/* --- FOR ApplicantForm.jsx must be fixed ----*/
export function submitApplicantForm(formData, projectId, positionId) {
  // Log the submission for debugging purposes
  console.log(`Submitting form for projectId: ${projectId}, positionId: ${positionId}`);

  // Check if positionId is defined and not empty
  if (!positionId) {
    console.error("positionId is undefined or empty.");
    // Reject the promise with an error if positionId is missing
    return Promise.reject(new Error("positionId is undefined or empty."));
  }

  // Construct the URL for the POST request
  const url = `${URL}/projects/${projectId}/positions/${positionId}/applicants`;

  // Perform the POST request to the server
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convert formData to JSON and send it in the request body
  }).then(res => {
      // Check if the network response is OK
      if (!res.ok) {
        // If not, throw an error
        throw new Error('Network response was not ok');
      }
      // Parse the response body as JSON and return it
      return res.json();
  });
}