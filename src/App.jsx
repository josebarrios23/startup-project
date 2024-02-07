import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ProjectCards from './components/ProjectCards';
import SingleProject from './components/SingleProject';
import Landing from './components/Landing';
import MainLayout from './MainLayout';
import Aside from './components/Aside';
import CreateNewProject from './components/CreateNewProject';

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
          </Routes>
          </section>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
