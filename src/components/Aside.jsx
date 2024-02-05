import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Aside = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  const handleUserSelect = (event) => {
    const user = event.target.value;
    setSelectedUser(user);
    onSelectUser(user);
    // Navigate directly upon selection instead of using the log-in button
    navigate(user === "" ? `/projectcards` : `/user/${user}`);
  };

  return (
    <aside>
      <h2>Aside</h2>
      <label htmlFor="userSelect">
        Select User Name to Modify Your Job Posts:
      </label>
      <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
        <option value="">All Posts</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
    </aside>
  );
};

export default Aside;