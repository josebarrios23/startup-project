import { useState } from 'react';

const EditProjectForm = () => {
    const [projectInfo, setProjectInfo] = useState({
        project: '',
        projectTitle: '',
        projectDescription: '',
    });

    const [positions, setPositions] = useState([
        { payPerHour: '', workDuration: '', experience: '' }
    ]);

    const handleProjectInfoChange = (e) => {
        const { name, value } = e.target;
        setProjectInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePositionChange = (index, e) => {
        const updatedPositions = positions.map((position, posIndex) => {
            if (index === posIndex) {
                return { ...position, [e.target.name]: e.target.value };
            }
            return position;
        });
        setPositions(updatedPositions);
    };

    const addPosition = () => {
        setPositions(positions.concat([{ payPerHour: '', workDuration: '', experience: '' }]));
    };

    const removePosition = (index) => {
        setPositions(positions.filter((_, posIndex) => index !== posIndex));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // this is where we add the api stuff to update data using form inputs
        console.log('Project Info:', projectInfo);
        console.log('Positions:', positions);
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                EditProjectForm
                <label>
                    Project:
                    <input name="project" value={projectInfo.project} onChange={handleProjectInfoChange} />
                </label>
                <label>
                    Project Title:
                    <input name="projectTitle" value={projectInfo.projectTitle} onChange={handleProjectInfoChange} />
                </label>
                <label>
                    Project Description:
                    <input name="projectDescription" value={projectInfo.projectDescription} onChange={handleProjectInfoChange} />
                </label>
                <div>
                    Positions Needed (only 1 entry required):
                    {positions.map((position, index) => (
                        <div key={index}>
                            <label>
                                Position {index + 1}:
                                <input name="payPerHour" value={position.payPerHour} onChange={(e) => handlePositionChange(index, e)} />
                            </label>
                            <label>
                                Pay Per Hour:
                                <input name="workDuration" value={position.workDuration} onChange={(e) => handlePositionChange(index, e)} />
                            </label>
                            <label>
                                Work Duration:
                                <input name="experience" value={position.experience} onChange={(e) => handlePositionChange(index, e)} />
                            </label>
                            <label>
                                Experience:
                                <input name="experience" value={position.experience} onChange={(e) => handlePositionChange(index, e)} />
                            </label>
                            {positions.length > 1 && (
                                <button type="button" onClick={() => removePosition(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addPosition}>Add Another Position</button>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default EditProjectForm;