// import React, { useState } from 'react';

// const Aside = ({ onSelectUser }) => {
//   const [selectedUser, setSelectedUser] = useState('');

//   const handleUserSelect = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSelectUser(selectedUser);
//   };

//   return (
//     <aside>
//       {/* <h2>Aside</h2> */}
//       <form className="aside-form" onSubmit={handleSubmit}>
//         <label htmlFor="userSelect">
//           <p>Select User</p>
//           <p>& Log In:</p>
//         </label>
//         <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
//           <option value="">All User Posts</option>
//           <option value="1">User 1</option>
//           <option value="2">User 2</option>
//           <option value="3">User 3</option>
//         </select>
//         <button type="submit" className="btn btn-rect-to-round btn-rect-to-round--red">Log In</button>
//         {/* when user is logged in the log in button turns into create new project button that connect to create project form - maybe use useEffect here? */}
//       </form>
//     </aside>
//   );
// };

// export default Aside;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Aside = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [showCreateProjectButton, setShowCreateProjectButton] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

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
    navigate('/createnewproject'); // Navigate to CreateNewProject route
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
