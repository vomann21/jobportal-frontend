import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import domains from '../data/domains'
import { profileUpdate,clearAllUpdateErrors,resetUpdateSlice } from "../store/slices/updateSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './UpdateProfile.css'
const UpdateProfile = ()=>{
    const {user} = useSelector((state)=>state.user)
    const [name,setName] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)
    const [firstDomain,setFirstDomain] = useState(user && user.domain && user.domain.firstDomain)
    const [secondDomain,setSecondDomain] = useState(user && user.domain && user.domain.secondDomain && user.domain.secondDomain)
    const [thirdDomain,setThirdDomain] = useState(user && user.domain && user.domain.thirdDomain && user.domain.thirdDomain)
    const [phone,setPhone] = useState(user && user.phone)
    const [address,setAddress]= useState(user && user.address)
    const [coverLetter,setCoverLetter] = useState(user && user.coverletter)
    const [newResume,setNewResume] = useState(null)
    const [role,setRole] = useState(user && user.role)
    const [createdAt,setCreatedAt] = useState(user && user.createdAt)
    const {error,message} = useSelector((state)=>state.update)

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        setNewResume(file);
    };



    const dispatch = useDispatch()
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name)
        formData.append('email',email)
        if(user.role == 'Job Seeker')
        {
            formData.append('firstDomain',firstDomain)
            formData.append('secondDomain',secondDomain)
            formData.append('thirdDomain',thirdDomain)
            formData.append('phone',phone)
            formData.append('coverLetter',coverLetter)
            formData.append('resume',newResume)
        }
        formData.append('address',address)
        formData.append('role',role)
        formData.append('createdAt',createdAt)
        dispatch(profileUpdate(formData))
    }


    useEffect(()=>{
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
                
              dispatch(clearAllUpdateErrors())
         }
         if(message)
         {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                
              dispatch(resetUpdateSlice())
         }
    },[error,message])
    return(
        <div className="profile-component">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <label>Email Address</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            {
                user.role=='Job Seeker' &&
                <div>
                    <label>Domain</label>
                    <select
                        value={firstDomain}
                        onChange={(e) => setFirstDomain(e.target.value)}
                        className="domain-option"
                    >
                    <option value="" disabled>
                        Select a first domain
                    </option>
                    {domains.map((domain,index) => (
                        <option key={index} value={domain}>
                            {domain}
                        </option>
                    ))}
                    </select>


                    {<select
                        value={secondDomain}
                        onChange={(e) => setSecondDomain(e.target.value)}
                        className="domain-option"
                    >
                    <option value="" >
                        Select a second domain
                    </option>
                    {domains.map((domain,index) => (
                        <option key={index} value={domain}>
                            {domain}
                        </option>
                    ))}
                    </select>}
                    {<select
                        value={thirdDomain}
                        onChange={(e) => setThirdDomain(e.target.value)}
                        className="domain-option"
                    >
                    <option value="">
                        Select a third domain
                    </option>
                    {domains.map((domain,index) => (
                        <option key={index} value={domain}>
                            {domain}
                        </option>
                    ))}
                    </select>}
                </div>
            }
            <label>Phone</label>
            <input type="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>

            <label>Address</label>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
           {
            user.resume && user.resume.url && 
            <div>
                <label>Resume</label>
                <a href={user.resume.url} style={{color:"blue"}} target="_blank" rel="noopener noreferrer">
                   Click here to download the resume
                </a>
            </div>
          }
          { user.role == 'Job Seeker' &&
          <div>
                <label className='resume-label'>Upload new Resume</label>
                <input type='file' className='resume' onChange={resumeHandler}></input>
          </div>
         }

         {
            user.role == 'Job Seeker' && 
            <div>
                <label>CoverLetter</label>
                <textarea className="dashboard-textarea"  value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}></textarea>
            </div>
         }

            <label>Role</label>
            <input type="text" value={user.role} disabled></input>

            <label>Joined On</label>
            <input type="text" value={user && user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : 'N/A'} disabled></input>
            <div className="update-btn-div">
                <button className="update-btn" onClick={handleFormSubmit}>Update</button>
            </div>
            

        </div>
    )
}

export default UpdateProfile;