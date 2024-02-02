import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../api/fetch";
import ApplicantForm from "./applicantForm";

export default function SingleProject() {
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
            </div>
            {/* Pass both projectId and selectedPositionKey to ApplicantForm */}
            <ApplicantForm projectId={id} positionId={selectedPositionKey} />
        </section>
    );
}
