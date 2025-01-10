import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logout,updateProfileImage,setUser } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const { user, token } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || '');

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async(e) => {
    
    
    e.preventDefault();

    const response = await fetch("http://localhost:3000/user/update", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json", },
      body: JSON.stringify({ name })
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(setUser({user: data.updatedUser}))
      
      toast.success(data.message || "name updated successfully", {
        autoClose: 500,
        onClose: () => setIsModalOpen(false),
      });

    } else {
      toast.error(data.message);
    }
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProfilePicChange = async (e) => {
    
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    
    const response = await fetch("http://localhost:3000/user/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(updateProfileImage(data.profileImage))
      toast.success(data.message || "profile uploaded successfully", {
        autoClose: 500,
        onClose: () => setIsModalOpen(false),
      });

    } else {
      toast.error(data.message);
    }
  };
  const handleLogout = () => {
    const isConfrim = window.confirm('Are you sure want to logout?')
    if(isConfrim){
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <img
        src={`http://localhost:3000/uploads/${user.profileImage}` || 'https://via.placeholder.com/100'}
        alt="Profile Photo"
        className="profile-photo"
      />
      <div className="profile-name">{user?.name}</div>
      <div className="profile-email">{user?.email}</div>
      <button className="edit-button" onClick={() => setIsModalOpen(true)}>
        Edit Profile
      </button>
      <button className="logout-button" onClick={handleLogout}>
        logout
      </button>

      {isModalOpen && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <h2>Edit Profile</h2>
            <div className="edit-profile-picture">
              <img
                src={`http://localhost:3000/uploads/${user.profileImage}` || 'https://via.placeholder.com/100'}
                alt="Profile Photo"
                className="edit-profile-photo"
                
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="file-input"
                
              />
            </div>
            <form onSubmit={handleFormSubmit}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <div className="user-modal-buttons">
                <button type="submit" className="user-save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="user-cancel-button"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default HomePage;
