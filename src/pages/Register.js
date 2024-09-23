import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {register,clearAllUserErrors} from '../store/slices/userSlice'
import { toast,ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import domains from '../data/domains'
import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Register = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [address,setAddress] = useState("")
  const [firstDomain,setFirstDomain]=useState("")
  const [secondDomain,setSecondDomain]= useState("")
  const [thirdDomain,setThirdDomain]= useState("")
  const [coverLetter,setCoverLetter] = useState("")
  const [role,setRole]= useState("")
  const [resume,setResume] = useState(null)
  const [isSubmitted,setisSubmitted] = useState(false)
  const [show,setShow] = useState(false)
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setResume(file); // Store the file in state
  };

  const {isRegistered,error,message,loading,errCode} = useSelector((state)=>{
        return state.user;
  })
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFormData = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",name)
        formData.append("email",email)
        formData.append("role",role)
        formData.append("password",password)
        formData.append("address",address)
        formData.append("phone",phone)
        if(role === 'Job Seeker')
        {
          formData.append("firstDomain",firstDomain)
          formData.append("secondDomain",secondDomain)
          formData.append("thirdDomain",thirdDomain)
          formData.append("resume",resume)
          formData.append("coverLetter",coverLetter)
        }
        console.log("formData",formData)
        setisSubmitted(true)
        dispatch(register(formData))
  }

  useEffect(()=>{
    console.log("I am in useEffect....")
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
          
        dispatch(clearAllUserErrors());
      }
      if(isRegistered)
      {
          toast.success("Successfully registered Navigating to Login",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          setTimeout(() => {
            navigate('/login');
         }, 5000); 
      }
  }
},[error,isRegistered,dispatch,isSubmitted])


const resumeHandler = (e) => {
  const file = e.target.files[0];
  setResume(file);
};


  return (
       <div className='register-body'>
            <Navbar></Navbar>
            <div className='form-header'>
                      Registration Form
            </div>
            <div className='register-form'>
                <div className='form' >
                     <label htmlFor="name">Username <span style={{color: "red"}}>*</span></label>
                     <input id="name" type='text' onChange={(e)=>setName(e.target.value)}></input>
                  
                     <label htmlFor="email">Email <span style={{color: "red"}}>*</span></label>
                     <input id="email" type='email' onChange={(e)=>setEmail(e.target.value)}></input>
                    
                    
                      <label htmlFor="password">Password <span style={{color: "red"}}>*</span></label>
                    <div className='inpu-container'>
                      <input id="password" type={show ? "text":"password"} onChange={(e)=>setPassword(e.target.value)}></input>{show ? <FaEyeSlash className="icon" onClick={(e)=>setShow(!show)}/>:<FaEye onClick={(e)=>setShow(!show)} className='icon'/>}
                    </div>

                     <label htmlFor="address">Address <span style={{color: "red"}}>*</span></label>
                     <input id="address" type='text' onChange={(e)=>setAddress(e.target.value)}></input>

                     <label htmlFor="phone">Phone <span style={{color: "red"}}>*</span></label>
                     <input id="phone" type='phone' onChange={(e)=>setPhone(e.target.value)}></input>

                     <div className='role-label' >Select your role <span style={{color: "red"}}>*</span></div>

                     <div className='radio'>
                        <label className="radio-label" htmlFor='role-jobseeker'>Job Seeker</label>
                        <input className="radio-input" name="role" id="role-jobseeker" type='radio' value="Job Seeker" onChange={(e)=>setRole(e.target.value)}></input>
                     </div>

                     <div className='radio'>
                        <label className="radio-label" htmlFor="role-employer">Employer</label>
                        <input className="radio-input" name="role" id="role-employer" type='radio' value="Employer" onChange={(e)=>setRole(e.target.value)}></input>
                     </div>

                     
                     {
                        role === "Job Seeker" && 
                            <div className='domain-inputs'>
                              <div className='domain-label'>Select Domains</div>
                              <label>First Domain <span style={{color: "red"}}>*</span></label>
                              <select className='domain-dropdown' onChange={(e)=>setFirstDomain(e.target.value)} placeholder="first domain" required>Select the First  
                              <option value="" className='domain-option'>Select a first domain</option>
                              {
                                  domains.map((domain)=>{
                                        return <option value={domain} className='domain-option'>{domain}</option>
                                  })
                              }
                              </select>
                              <label>Additional Domains</label>
                              <select className='domain-dropdown' onChange={(e)=>setSecondDomain(e.target.value)} placeholder="second domain">Select the First domain
                              <option value="" className='domain-option'>Select a second domain</option>
                              {
                                  domains.map((domain)=>{
                                        return <option value={domain} className='domain-option'>{domain}</option>
                                  })
                              }
                              </select>
                              <select className='domain-dropdown' onChange={(e)=>setThirdDomain(e.target.value)} placeholder="first domain">Select the First domain
                              <option value="" className='domain-option'>Select a third domain</option>
                              {
                                  domains.map((domain)=>{
                                        return <option value={domain} className='domain-option'>{domain}</option>
                                  })
                              }
                              </select>

                              <label className='resume-label'>Upload Resume</label>
                              <input type='file' className='resume' onChange={resumeHandler}></input>
                              

                              <label>CoverLetter</label>
                              <textarea className="cover-letter" placeholder='cover letter' onChange={(e)=>setCoverLetter(e.target.value)}></textarea>

                              
                           </div>
                     }
                     <div className="registration-button">
                     <button  onClick={handleFormData}>Register</button>
                     </div>

                     <div className="login-button">
                       <button><Link to="/login" className='link'>Login</Link></button>
                     </div>
                </div>
            </div>
       </div>
  )
}

export default Register