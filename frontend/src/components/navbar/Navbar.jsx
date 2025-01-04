import React,{useState} from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {logoutAdmin} from '../../redux/adminSlice'

function Navbar({onSearch }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {

    dispatch(logoutAdmin());
    navigate("/admin/login");
  };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Pass the search query to the parent component
  };
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar