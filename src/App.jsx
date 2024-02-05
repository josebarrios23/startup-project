import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ProjectCards from './components/ProjectCards';
import SingleProject from './components/SingleProject';
import Landing from './components/Landing';
import MainLayout from './MainLayout';
import Aside from './components/Aside';
import Header from './components/Header';

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [selectedUser, setSelectedUser] = useState(''); // State to store the selected user

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
          <Routes>
            <Route path="/projectcards" element={<ProjectCards selectedUser={selectedUser} />} />
            <Route path="/:id" element={<SingleProject />} />
          </Routes>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
