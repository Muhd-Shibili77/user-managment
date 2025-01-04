import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard({fetchUsers, query }) {
  const [users, setUsers] = useState([]);
  
  const token = sessionStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  
  const [editUser, setEditUser] = useState(null); 
  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    password: "", 
  });
  
  

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const data = await fetchUsers(query);
      setUsers(data);
    };
    fetchAndSetUsers();
  }, [query, fetchUsers]); 
   

 
  const handleEdit = (userId) => {
    const user = users.find((user) => user._id === userId);
    setEditUser(user);
    setIsModalOpen(true);
  };

  // Handle add new user
  const handleAddUserBtn = () => {
    setIsAddUserModalOpen(true)
  };

  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async()=>{
    try {
      const response = await fetch("http://localhost:3000/admin/addUser", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.success){
          setUsers((prevUsers) => [...prevUsers, data.user]);
          toast.success("User added successfully!", {
            autoClose: 500,
            onClose: () => setIsAddUserModalOpen(false),
          });
          setAddUser({
            name: "",
            email: "",
            password: "",
          });
        }else{
          toast.error(data.message)
        }
        
      } else {
        console.error("Failed to add user");
        toast.error("Failed to add user")
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  const handleCloseAddUserModal = ()=>{
    setIsAddUserModalOpen(false)
    setAddUser({
      name: "",
      email: "",
      password: "",
    });
  }



  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/users/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === data._id ? data : user))
        );
        toast.success(data.message || "profile updated successfully", {
          autoClose: 500,
          onClose: () => setIsModalOpen(false),
        });
       
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));  // Remove deleted user from the state
       
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    
  };

  

  
  


  return (
    <div className="table-container">
      <h2>User List</h2>
      <button className="add-user-btn" onClick={handleAddUserBtn}>
        Add User
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser(editUser);
              }}
            >
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="delete-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}



      {isAddUserModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser(addUser);
              }}
            >
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={addUser.name}
                onChange={handleAddUserChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={addUser.email}
                onChange={handleAddUserChange}
              />
              <label>password:</label>
              <input
                type="password"
                name="password"
                value={addUser.password}
                onChange={handleAddUserChange}
              />
              <button type="submit" className="submit-btn">
                ADD
              </button>
              <button
                type="button"
                onClick={handleCloseAddUserModal}
                className="delete-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

     

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
