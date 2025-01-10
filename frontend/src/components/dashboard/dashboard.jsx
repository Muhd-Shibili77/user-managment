import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useSelector,useDispatch } from "react-redux";
import { fetchUsers,AddUser,updateUser,deleteUser } from "../../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard({ query }) {
  const dispatch = useDispatch()
  const {users , loading,error }= useSelector((state)=>state.users)
 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  
  const [editUser, setEditUser] = useState(null); 
  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    password: "", 
  });
  
  

  useEffect(() => {
   
    dispatch(fetchUsers(query))
      
  }, [query, dispatch]);

 

  // Handle add new user
  const handleAddUserBtn = () => {
    setIsAddUserModalOpen(true)
  };

  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async ()=>{
    dispatch(AddUser(addUser))
    .unwrap()
    .then(() => {
      toast.success("user added successfully", {
          autoClose: 500,
          onClose: () => setIsAddUserModalOpen(false),
        });
        setAddUser({name: "",email: "",password: ""});
    })
    .catch(() =>{
      console.log(error)
      toast.error( error || "Failed to Add user.")

    });
  }


  

  const handleCloseAddUserModal = ()=>{
    setIsAddUserModalOpen(false)
    setAddUser({
      name: "",
      email: "",
      password: "",
    });
  }



  const handleEdit = (userId) => {
    const user = users.find((user) => user._id === userId);
    setEditUser(user);
    setIsModalOpen(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async ()=>{
      dispatch(updateUser(editUser))
      .unwrap()
      .then(() => {
        toast.success("user updated successfully", {
            autoClose: 500,
            onClose: () => setIsModalOpen(false),
          });
      })
      .catch(() => toast.error("Failed to update user."));
  }

  

const handleDeleteBtn = (userId)=>{
  const isConfirm = window.confirm('Are you sure want to delete the user?')
  if(isConfirm){
    handleDelete(userId)
  }
}

const handleDelete = async (userId) => {
  dispatch(deleteUser(userId))
  .unwrap()
  .then(()=>{
    toast.success("user deleted successfully", {
      autoClose: 500
    });
  })
  .catch(() => toast.error("Failed to delete user."));
}

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
                    onClick={() => handleDeleteBtn(user._id)}
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
                handleUpdateUser();
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
                handleAddUser();
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
