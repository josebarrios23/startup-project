import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// useNavigate to add to edit button so it can navigate to Edit Job form
import { getOneUser } from "../api/fetch";

export default function UserSingleProject() {
    const [singleUser, setSingleUser] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const [loadingError, setLoadingError] = useState(false);
    // State to hold the selected position key
    const [selectedPositionKey, setSelectedPositionKey] = useState('');

    useEffect(() => {
        getOneUser(id)
            .then((data) => {
                setSingleUser(data);
            })
            .catch((error) => {
                console.error(error);
                setLoadingError(true);
            });
    }, [id]);

    if (loadingError) {
        return <div>Error loading user data.</div>;
    }

    if (!singleUser) {
        return null;
    }

    const handlePositionSelect = (event) => {
        setSelectedPositionKey(event.target.value); // added this so applicants can select position they want within project they chose
    };
// delete / edit post button
// edit button takes you to EditPostForm.jsx
// delete connects to api to delete the post
    return (
        <section className="applicant-view">
            <div className="project-card">
                <h1>{singleUser.project.projectTitle}</h1>
                <h2>{singleUser.name.firstName} {singleUser.name.lastName}</h2>
                <div>{singleUser.project.fullDescription}</div>

                {/* Position selection dropdown */}
                <label htmlFor="positionSelect">Choose a position:</label>
                <select id="positionSelect" value={selectedPositionKey} onChange={handlePositionSelect}>
                    <option value="">Select a position</option>
                    {Object.keys(singleUser.project.positionsNeeded).map((position) => (
                        <option key={position} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
               {/* Edit button links to EditProjectForm.jsx so need route  */}
                {/* using use navigate to let button navigate to EditProjectForm.jsx form page */}
                <button onClick={() => navigate(`/edit-project/${id}`)}>Edit</button>
            </div>
        </section>
    );
}