import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api/fetch";
import "../App.css";

export default function UserProjectCards({ selectedUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

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
  }, [selectedUser]); // Added selectedUser as a dependency to refetch when selectedUser changes

  const filteredUsers = selectedUser
    ? allUsers.filter((user) => user.user === selectedUser)
    : allUsers;

  return (
    <>
      <h1 className="user-cards">User Cards</h1>
      <div className="job-posts">
        {filteredUsers.map((singleUser, index) => (
          <div className="project-card" key={`${singleUser.user}-${index}`}>
            {/* added link to navigate to different page for selected user which will lead to UserSingleProject.jsx where you can edit / delete */}
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
              {/* delete button needs to connect to API */}
              <button>Delete</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
