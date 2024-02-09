import React from "react";
import "../App.css"

const About = () => {
    const teamMembers = [
        {
            name: "Cristian Garcia",
            github: "https://github.com/cristiangarc",
            funFact: "I love eating at restaurants",
        },
        {
            name: "Jose Barrios",
            github: "https://github.com/josebarrios23",
            funFact: "I LOVE Astronomy",
        },
        {
            name: "Enoch Tagoe",
            github: "https://github.com/EnochTagoe1",
            funFact: "I love travelling",
        },
        {
            name: "Julissa Garcia",
            github: "https://github.com/JuliGarc91",
            funFact: "I love mafia movies; my fave is GoodFellas",
        }
    ];

    return (
        <div>
            <h2>Team Members</h2>
            <div className="members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <p>{member.name}</p>
                        <p>Github:</p>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                            View Github Profile
                        </a>
                        <p>Fun Fact:</p>
                        <p>"{member.funFact}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;