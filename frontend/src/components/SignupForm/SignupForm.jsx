import React,{useState} from 'react'
import './SignupForm.css'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/')
    }

    const handleSignup = async (e)=>{
      e.preventDefault();
      try{
       

        const response = await fetch('http://localhost:3000/user/register',{
          method:'POST',
          headers: 
                { 'Content-Type': 'application/json' },
          body:JSON.stringify({name,email,password})
        })
  
        const result = await response.json()
        
        if (response.ok) {
         
          if(result.success){
          
            toast.success(result.message || 'user registered successfully', {
              autoClose: 1500,
              onClose: () => navigate('/')
            });

          }else{
            toast.error(result.message);
          }
  
        } else {
          toast.error(result.message);
        }

        
      }catch(error){

        console.error('Error registration:',error)
        toast.error('An error occurred.Please try again later');

      }
     
    }

  return (
    <div className="body">
         <div className="container">
        <div className="form-wrapper">
            <h2 className='title'> Signup </h2>
                 <form className='form'>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='button' onClick={handleSignup} >signup</button> 
                 </form>
                 <p className="footer-text">
                    Already have account? <a href='' onClick={handleLogin}>Sign in</a>
                 </p>
         </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignupForm