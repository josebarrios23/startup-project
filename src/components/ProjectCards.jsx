import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const filteredUsers = selectedUser
    ? allUsers.filter((user) => user.user === selectedUser)
    : allUsers;

  return (
    <>
      <div className="job-posts">
        {filteredUsers.map((singleUser, index) => (
          <div className="project-card" key={`${singleUser.user}-${index}`}>
            <Link className="card-content" to={`/${singleUser.id}`}>
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
                        <strong>{position}</strong>: {details.workDuration}, {details.experience} experience
                      </div>
                    )
                  )}
                </section>
              </div>
              {selectedUser && (
                <button
                  onClick={(event) => {
                    event.preventDefault();
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
