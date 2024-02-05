// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getAllUsers } from "../api/fetch";
// import "../App.css";

// export default function UserProjectCards({ selectedUser }) {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loadingError, setLoadingError] = useState(false);

//   useEffect(() => {
//     getAllUsers()
//       .then((data) => {
//         setAllUsers(data);
//         setLoadingError(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoadingError(true);
//       });
//   }, [selectedUser]); // Added selectedUser as a dependency to refetch when selectedUser changes

//   const filteredUsers = selectedUser
//     ? allUsers.filter((user) => user.user === selectedUser)
//     : allUsers;

//   return (
//     <>
//       <h1 className="user-cards">User Cards</h1>
//       <div className="job-posts">
//         {filteredUsers.map((singleUser, index) => (
//           <div className="project-card" key={`${singleUser.user}-${index}`}>
//             {/* added link to navigate to different page for selected user which will lead to UserSingleProject.jsx where you can edit / delete */}
//             <Link to={`/user/job/${singleUser.user}`} className="card-content">
//               <h2>{singleUser.project.projectTitle}</h2>
//               <p>{singleUser.name.firstName} {singleUser.name.lastName}</p>
//               <div className="positions-needed">
//                 <h3>Positions Needed:</h3>
//                 <section>
//                   {Object.entries(singleUser.project.positionsNeeded).map(([position, details]) => (
//                     <div key={position}>
//                       <strong>{position}</strong>: {details.workDuration}, {details.experience} experience
                      
//                     </div>
//                   ))}
                  
//                 </section>
//               </div>
//               {/* delete button connect to API */}
//               <button>Delete</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/fetch";
import "../App.css";

export default function UserProjectCards({ selectedUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setAllUsers(data);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, [selectedUser]); // This is fine to refetch when selectedUser changes

  const filteredUsers = selectedUser
    ? allUsers.filter((user) => user.user === selectedUser)
    : allUsers;

  // Placeholder for delete function - Implement your API call for deletion inside
  const handleDelete = (userId) => {
    // Placeholder: Implement deletion logic with API call
    console.log("Deleting user with ID:", userId);
    // After deletion, you might want to refresh the list or navigate the user elsewhere
  };

  return (
    <>
      <h1 className="user-cards">User Cards</h1>
      <div className="job-posts">
        {filteredUsers.map((singleUser, index) => (
          <div className="project-card" key={`${singleUser.user}-${index}`}>

            {/* delete button needs to connect to api */}
            <button onClick={() => handleDelete(singleUser.id)}>Delete</button>

            {/* edit button takes you to edit form page */}
            <button onClick={() => navigate(`/edit-project/${singleUser.id}`)}>Edit</button>


            <Link to={`/user/job/${singleUser.user}`} className="card-content">
              <h2>{singleUser.project.projectTitle}</h2>
              <p>{singleUser.name.firstName} {singleUser.name.lastName}</p>
              <div className="positions-needed">
                <h3>Positions Needed:</h3>
                <section>
                  {Object.entries(singleUser.project.positionsNeeded).map(([position, details]) => (
                    <div key={position}>
                      <strong>{position}</strong>: {details.workDuration}, {details.experience} experience
                    </div>
                  ))}
                </section>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
