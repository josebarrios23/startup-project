import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../api/fetch";
import ApplicantForm from "./ApplicantForm";
import EditProject from "./EditProjectForm";

export default function SingleProject({ selectedUser }) {
    const [singleUser, setSingleUser] = useState(null);
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

    return (
        <section className="applicant-view">
            <div className="project-card single-project-details">
                <h1>{singleUser.project.projectTitle}</h1>
                <h2>{singleUser.name.firstName} {singleUser.name.lastName}</h2>
                <div>{singleUser.project.fullDescription}</div>
                {Object.entries(singleUser.project.positionsNeeded).map(
                    ([position, details]) => (
                        <div key={position}>
                            <strong>{position}</strong>: {details.workDuration}, {details.experience} experience, {details.payPerHour} per hour, {details.applicantInfo.length} applicant(s).
                            {selectedUser && (
                                <div>
                                    {details.applicantInfo.map((applicant, index) => (
                                        <div key={index}>
                                            <p><strong>Applicant</strong>: {applicant.applicant}</p>
                                            <p><strong>Email</strong>: {applicant.email}</p>
                                            <p><strong>Comments</strong>: {applicant.comments}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}

                {!selectedUser && ( // Check if singleUser is truthy
                    <div>
                        {/* Position selection dropdown */}
                        <label htmlFor="positionSelect">Choose a position:</label>
                        <br />
                        <select id="positionSelect" value={selectedPositionKey} onChange={handlePositionSelect}>
                            <option value="">Select a position</option>
                            {Object.keys(singleUser.project.positionsNeeded).map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            {selectedUser ? (<EditProject userId={id} />) : (
                <ApplicantForm userId={id} position={selectedPositionKey} />
            )}
        </section>
    );
}
