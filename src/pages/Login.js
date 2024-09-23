import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'
import {clearAllUserErrors,login} from '../store/slices/userSlice'
import 'react-toastify/dist/ReactToastify.css';
import { Link,Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
const Login = () => {
  const [email,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [role,setRole]=useState("")
  const [isSubmitted,setisSubmitted]=useState(false)
  
  const {isAuthenticated,loading,error,errCode} = useSelector((state)=>{
      return state.user;
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const handleFormData = (e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("email",email)
      formData.append("role",role)
      formData.append("password",password)
      console.log("formData",formData);
      setisSubmitted(true);
      dispatch(login(formData))
   }

  useEffect(()=>{
        console.log("This is error response")
        console.log(error)
       if(isSubmitted)
      {
        if(error)
        {
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          dispatch(clearAllUserErrors())
        }
        if(isAuthenticated)
        {
          toast.success("Login successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setTimeout(()=>{
                navigate('/');
            },3000)
        }
      }
  },[isAuthenticated,error,isSubmitted])

  return (
        <div className='register-body'>
            <Navbar></Navbar>
            <div className='form-header'>
                      Login Form
            </div>
            <div className='register-form'>
                <div className='form' >
                     <label htmlFor="email">Email <span style={{color: "red"}}>*</span></label>
                     <input id="email" type='email' onChange={(e)=>setEmail(e.target.value)}></input>
                  
                     <label htmlFor="password">Password <span style={{color: "red"}}>*</span></label>
                     <input id="password" type='password' onChange={(e)=>setPassword(e.target.value)}></input>

                     <div className='role-label' >Select your role <span style={{color: "red"}}>*</span></div>

                     <div className='radio'>
                        <label className="radio-label" htmlFor='role-jobseeker'>Job Seeker</label>
                        <input className="radio-input" name="role" id="role-jobseeker" type='radio' value="Job Seeker" onChange={(e)=>setRole(e.target.value)}></input>
                     </div>

                     <div className='radio'>
                        <label className="radio-label" htmlFor="role-employer">Employer</label>
                        <input className="radio-input" name="role" id="role-employer" type='radio' value="Employer" onChange={(e)=>setRole(e.target.value)}></input>
                     </div>

                     <div className="login-button">
                        <button  onClick={handleFormData}>Login</button>
                     </div>
                    
                     <div className="registration-button">
                       <button style={{marginBottom:"1rem"}}><Link to="/register" className='link'>Register</Link></button>
                     </div>
                     
                </div> 
            </div>
        </div>
  )
}

export default Login