import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import { getAllUsers, deleteUser } from "../api/fetch";
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

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // Filter users based on the selected user value or display all users if no user is selected
  const filteredUsers = selectedUser
    ? allUsers.filter((user) => user.user === selectedUser)
    : allUsers;

  return (
    <>
      {/* <h1 className="user-cards">User Cards</h1> */}
      {/* Conditionally render the button based on selectedUser */}
      {/* {selectedUser && (
        <Link to="/CreateNewProject" className="create-project-button">
          Create New Project
        </Link>
      )} */}
      <div className="job-posts">
        {filteredUsers.map((singleUser, index) => (
          <div className="project-card" key={`${singleUser.user}-${index}`}>
            <Link className="card-content" to={`/${singleUser.user}`}>
              <h2 className="project-title">{singleUser.project.projectTitle}</h2>
              <p className="project-title">
                {singleUser.name.firstName} {singleUser.name.lastName}
              </p>
              <div className="positions-needed">
                <h3 className="positions-needed">Positions Needed:</h3>
                <section>
                  {Object.entries(singleUser.project.positionsNeeded).map(
                    ([position, details]) => (
                      <div key={position}>
                        <strong>{position}</strong>: {details.workDuration},{" "}
                        {details.experience} experience
                      </div>
                    )
                  )}
                </section>
              </div>
              {selectedUser && (
                <button
                  onClick={(event) => {
                    event.preventDefault(); // Prevent the default link behavior
                    handleDelete(singleUser.id);
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
