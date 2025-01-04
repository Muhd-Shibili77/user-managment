import React,{useState} from 'react'
import './adminLoginForm.css'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAdmin } from '../../redux/adminSlice';

function adminLoginForm() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

  
  const handleLogin = async (e) => {
     
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const result = await response.json();
  
        
        if (response.ok) {
          if (result.success) {
            dispatch(setAdmin({ admin:result.user, token:result.token }));
            toast.success(result.message || "admin loggined successfully", {
              autoClose: 1500,
              onClose: () => navigate("/admin/dashboard"),
            });
  
          } else {
            toast.error(result.message);
          }
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error login:", error);
        toast.error("An error occurred.Please try again later");
      }

      }


  return (
    <div className="body">
         <div className="container">
        <div className="form-wrapper">
            <h2 className='title'> Admin Login </h2>
                 <form className='form'>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='button' onClick={handleLogin}  >Login</button> 
                 </form>
                
         </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default adminLoginForm