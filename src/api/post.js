// const URL = import.meta.env.VITE_BASE_API_URL;

// export function submitApplicantForm(formData) {
//     return fetch(`${URL}/applicantInfo`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     }).then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     });
//   }