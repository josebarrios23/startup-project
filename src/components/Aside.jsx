import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Aside = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [showCreateProjectButton, setShowCreateProjectButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowCreateProjectButton(selectedUser !== '');
  }, [selectedUser]);

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelectUser(selectedUser);
  };

  const handleCreateProject = () => {
    navigate('/createnewproject');
  };

  return (
    <aside>
      <form className="aside-form" onSubmit={handleSubmit}>
        <label htmlFor="userSelect">
          <p>Select User & Log In:</p>
        </label>
        <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
          <option value="">All User Posts</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
        <button type="submit" className="btn btn-rect-to-round btn-rect-to-round--red">Log In</button>
        {showCreateProjectButton && (
          <button type="button" onClick={handleCreateProject}>Create New Project</button>
        )}
      </form>
    </aside>
  );
};

export default Aside;
