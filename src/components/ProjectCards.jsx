import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/fetch";
import { Link } from "react-router-dom";
import "../App.css";

export default function ProjectCards({ selectedUser }) {
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
  }, []);

  // Filter users based on the selected user value or display all users if no user is selected
  const filteredUsers = selectedUser
    ? allUsers.filter((user) => user.user === selectedUser)
    : allUsers;

  return (
    <>
      <h1 className="user-cards">User Cards</h1>
      <div className="job-posts">
        {filteredUsers.map((singleUser, index) => (
          <div className="project-card" key={`${singleUser.user}-${index}`}>
            <Link className="card-content" to={`/${singleUser.user}`}>
              <h2>{singleUser.project.projectTitle}</h2>
              <p>{singleUser.name.firstName} {singleUser.name.lastName}</p>
              <div className="positions-needed">
                <h3 className="positions-needed">Positions Needed:</h3>
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
