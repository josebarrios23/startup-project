import React, { useState } from 'react';

const Aside = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelectUser(selectedUser);
  };

  return (
    <aside>
      {/* <h2>Aside</h2> */}
      <form className="aside-form" onSubmit={handleSubmit}>
        <label htmlFor="userSelect">
          <p>Select User</p>
          <p>& Log In:</p>
        </label>
        <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
          <option value="">All User Posts</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
        <button type="submit" className="btn btn-rect-to-round btn-rect-to-round--red">Log In</button>
      </form>
    </aside>
  );
};

export default Aside;