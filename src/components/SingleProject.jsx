import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../api/fetch";

export default function SingleProject() {
    const [singleUser, setSingleUser] = useState(null);
    const { id } = useParams();
    const [loadingError, setLoadingError] = useState(false);

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

    return (
        <div className="project-card">
            <h1>{singleUser.project.projectTitle}</h1>
            <h2>{singleUser.name.firstName} {singleUser.name.lastName}</h2>
            <div>{singleUser.project.fullDescription}</div>
        </div>
    );
}
