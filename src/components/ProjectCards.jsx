import { useState, useEffect } from "react";
import { getAllUsers } from "../api/fetch";
import { Link } from "react-router-dom";
import "../App.css"

export default function ProjectCards() {
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

return (
  <>
  <h1>User Cards</h1>
    <div className="job-posts">
      {/* i added line above for CSS - fix */}
      {allUsers.map((singleUser) => (
        <div className="project-card" key={singleUser.user}>
            <Link to={`/${singleUser.user}`}>
          <h2>{singleUser.project.projectTitle}</h2>
          <p>{singleUser.name.firstName} {singleUser.name.lastName}</p>
          <div>
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