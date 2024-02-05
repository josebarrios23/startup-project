import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Aside = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate so that this could be used in handleSubmit (so it navigates to different page view aka Route)

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelectUser(selectedUser);
    // added ternary so that when a user isn't selected all the project cards show - was broken before
    navigate(selectedUser === "" ? `/projectcards` : `/user/${selectedUser}`); 
  };

  return (
    <aside>
      <h2>Aside</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userSelect">Select User:</label>
        <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
          <option value="">All Posts</option> 
          {/* changed line above to "All Posts so that it's more intuitive to user - maybe we can add button just for this so that applicants don't get confused - since log in button is for users viewing /editing / deleting their posts whereas applicants wont have to log in at all" */}
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
        {/* <button type="submit" className="btn btn-rect-to-round btn-rect-to-round--red">Log In</button> */}
        {/* next line could be button for viewers /applicants who don't need to log in */}
        <button type="submit" className="btn btn-rect-to-round btn-rect-to-round--red">Job Posts</button>
      </form>
    </aside>
  );
};

export default Aside;