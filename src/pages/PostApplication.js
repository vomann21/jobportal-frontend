import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { clearAllApplicationErrors, postApplication,resetApplicationSlice } from '../store/slices/applicationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {fetchSingleJob} from '../store/slices/jobSlice'
import Navbar from '../components/Navbar';
import './PostApplication.css'
import Footer from '../components/Footer'
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

const PostApplication = () => {
  const {loading,error,message}= useSelector((state)=>{
      return state.applications;
  })
  const {isAuthenticated,user} = useSelector((state)=>{
      return state.user
  })
  
  const {singleJob} = useSelector((state)=>{
      return state.jobs;
  })
  
  const {jobId} = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  useEffect(()=>{
      console.log("I am in useEffect postApplication asdkasmd asdas..........................",message)
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setAddress(user.address || "");
        setCoverLetter(user.coverLetter || "");
        setResume((user.resume && user.resume.url) || "");
      }

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
         dispatch(clearAllApplicationErrors())
      }
      
      if(message)
      {
         console.log("I am at message message changed",message)
         toast.success(message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
         })
         dispatch(resetApplicationSlice())
      }
      dispatch(fetchSingleJob(jobId))
  },[error,message,user])




  const onFormSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        console.log(name,email,phone)
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('address',address);
        formData.append('coverLetter',coverLetter);
        formData.append('resume',resume);
        dispatch(postApplication(formData,jobId))
        dispatch(clearAllApplicationErrors());
  }
  
  let qualifications="";
  let responsibilities="";
  let offering="";
  if(singleJob.qualifications)
  {
      qualifications=singleJob.qualifications;
  }
  if(singleJob.responsibilities)
  {
      responsibilities=singleJob.responsibilities;
  }
  if(singleJob.offers)
  {
      responsibilities=singleJob.offers;
  }
  
  const resumeHandler = (e)=>{
       const file = e.target.files[0];
       setResume(file);
  }
  
  return (
    <div>
        <Navbar style={{position:"sticky"}}></Navbar>
        <div className='job-application'>
              <form className='application-form'>
                    <div className='heading'>Application Form</div>
                    <label>Job Title</label>
                    <input type='text' placeholder={singleJob.title} disabled></input>
                    <label>Your name</label>
                    <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                    <label>Your Email</label>
                    <input type='text' value={email} onChange={(e)=>{setName(e.target.value)}}></input>
                    <label>Your Phone Number</label>
                    <input type='text' value={phone} onChange={(e)=>{setName(e.target.value)}}></input>
                    <label>Your Address</label>
                    <input type='text' value={address} onChange={(e)=>{setName(e.target.value)}}></input>
                    <label>Cover Letter</label>
                    <textarea type='text' value={coverLetter} onChange={(e)=>{setCoverLetter(e.target.value)}}>{coverLetter}</textarea>
                    <label>Resume</label>
                    {user && user?.resume?.url && <div>Want to upload new resume..</div>}
                    <input type='file' onChange={resumeHandler}></input>
                    
                    <button className='btn' onClick={onFormSubmit}>Send Application</button> 
            </form>

            <div className='job-details'>
              <div className='about-1'>
                <div className='heading'>{singleJob.title}</div>
                <div><BsFillBuildingsFill />  {singleJob.companyName}</div>
                <div><IoLocationSharp />  {singleJob.location}</div>
              </div>
              <hr/>
              <div className='about-2'>
                  <div className='heading'>Job details</div>
                  <div>Pay:  {singleJob.salary}</div>
                  <div>Job Type: {singleJob.jobType}</div>
              </div>
              <hr/>
              <div className='about-3'>
                  <div className='heading'>Full Job Description</div>
                  <div>{singleJob.introduction}</div>
                  <hr/>
                  <div className='heading'>Qualification</div>
                  <div>{singleJob.qualifications}</div>
                  <hr/>
                  <div className='heading'>Responsibilities</div>
                  <div>{singleJob.responsibilities}</div>
                  <hr/>
                  <div className='heading'>Offers</div>
                  <div>{singleJob.offers}</div>
              </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default PostApplication