import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ProjectCards from './components/ProjectCards';
import SingleProject from './components/SingleProject';
import Landing from './components/Landing';
import MainLayout from './MainLayout';
import Aside from './components/Aside';
import CreateNewProject from './components/CreateNewProject';
import { v4 } from "uuid";

//About component works in App.jsx, but About.jsx breaks code when imported - not sure why yet
const About = () => {
    const teamMembers = [
      // about us code originally by Cristian and featured in one of our previous projects
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
      },
    ];

    return (
        <div>
            <h2>Team Members</h2>
            <div className="members">
                {teamMembers.map((member) => (
                    <div key={v4()} className="team-member">
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

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [selectedUser, setSelectedUser] = useState('');

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className={isLandingPage ? 'landing-layout' : ''}>
      {isLandingPage ? (
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
        <MainLayout>
          <Aside onSelectUser={handleSelectUser} />
          <section className="container">
          <Routes>
            <Route path="/projectcards" element={<ProjectCards selectedUser={selectedUser} />} />
            <Route path="/:id" element={<SingleProject selectedUser={selectedUser}/>} />
            <Route path="/createnewproject" element={<CreateNewProject selectedUser={selectedUser} />} />
            {/* added about page */}
            <Route path="/about" element={<About />} /> 
          </Routes>
          </section>
        </MainLayout>
      )}
    </div>
  );
};

export default App;

