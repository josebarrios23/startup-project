import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// Styling:
import "./App.css";
import Landing from "./components/Landing";
// Wrap around component that connects Landing Page to App.jsx
import MainLayout from "./MainLayout";
// Components For Dynamic Functionality:
import Aside from "./components/Aside";
import ProjectCards from "./components/ProjectCards";
import SingleProject from "./components/SingleProject";
import UserProjectCards from "./components/UserProjectCards";
import UserSingleProject from "./components/UserSingleProject";
import EditProjectForm from "./components/EditProjectForm";

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [selectedUser, setSelectedUser] = useState("");

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className={isLandingPage ? "landing-layout" : ""}>
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
            {/* the following Routes are for logged in users only */}
            <Route path="/user/:id" element={<UserProjectCards selectedUser={selectedUser} />} />
            <Route path="/user/job/:id" element={<UserSingleProject/>} />
            <Route path="/edit-project/:id" element={<EditProjectForm />} />
          </Routes>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
