import { useState,useEffect } from "react";
import cities from '../data/cities'
import domains from "../data/domains";
import './CreateJob.css'
import { createJob, resetJobSlice } from "../store/slices/jobSlice";
import {useDispatch, useSelector} from 'react-redux' 
import { toast } from "react-toastify";
import { clearAllJobErrors,resetForJobSlice } from "../store/slices/jobSlice";

import 'react-toastify/dist/ReactToastify.css';
const CreateJob = ()=>{

    const [title,setTitle]=useState('')
    const [companyName,setCompanyName] = useState('')
    const [jobType,setJobType] = useState('')
    const [location,setLocation] = useState('')
    const [introduction,setIntroduction]=useState('')
    const [responsibilities,setResponsibilities] = useState('')
    const [qualifications,setQualifications] = useState('')
    const [offers,setOffers] = useState('')
    const [salary,setSalary] = useState('')
    const [personalWebsiteUrl,setPersonalWebsiteUrl] = useState('')
    const [jobDomain,setJobDomain] = useState('')
    const [expiresIn,setExpiresIn] = useState('')
    const [newsLetterSent,setNewsLetterSent] = useState(false)
    const [logo,setLogo]=useState(null)
    
    const {error,message} = useSelector((state)=>state.jobs)

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
                
              dispatch(clearAllJobErrors())
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
            dispatch(resetForJobSlice())
        }
    },[error,message])
    
    const handleLogo = (e)=>{
            const file = e.target.files[0];
            setLogo(file);
    }
    const dispatch = useDispatch()
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("companyName",companyName);
        formData.append("jobType",jobType);
        formData.append("location",location);
        formData.append("introduction",introduction);
        formData.append("responsibilities",responsibilities);
        formData.append("qualifications",qualifications);
        formData.append("offers",offers);
        formData.append("salary",salary);
        formData.append("personalWebsiteUrl",personalWebsiteUrl);
        formData.append("jobDomain",jobDomain);
        formData.append("expiresIn",expiresIn);
        formData.append("newsLetterSent",newsLetterSent);
        formData.append("logo",logo);

        dispatch(createJob(formData))
    }

    return(
        <div className="create-job">
             <h1>Create a Job</h1>
             <div className="form">
                <label >Title<span style={{color:"red"}}>*</span></label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <label>Company Name<span style={{color:"red"}}>*</span></label>
                <input type="text" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}></input>

                <label>JobType<span style={{color:"red"}}>*</span></label>
                <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="domain-option"
                >
                <option value="Internship">
                    Internship
                </option>
                <option value="Full-time">
                    Full-time
                </option>
                <option value="Intern+Full-time">
                    Intern+Full-time
                </option>
                </select>
                
                <label>Location<span style={{color:"red"}}>*</span></label>
                <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="domain-option"
                    >
                    <option value="">
                        Select a location
                    </option>
                    {cities.map((city,index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                <label>Introduction<span style={{color:"red"}}>*</span></label>
                <textarea className="dashboard-textarea"  value={introduction} onChange={(e)=>setIntroduction(e.target.value)}></textarea>

                <label>Responsibilities<span style={{color:"red"}}>*</span></label>
                <textarea className="dashboard-textarea"  value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)}></textarea>

                <label>Qualifications<span style={{color:"red"}}>*</span></label>
                <textarea className="dashboard-textarea"  value={qualifications} onChange={(e)=>setQualifications(e.target.value)}></textarea>

                <label>Offers</label>
                <textarea className="dashboard-textarea"  value={offers} onChange={(e)=>setOffers(e.target.value)}></textarea>

                <label >Salary<span style={{color:"red"}}>*</span></label>
                <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value)}></input>

                <label >Personal Website Url</label>
                <input type="text" value={personalWebsiteUrl} onChange={(e)=>setPersonalWebsiteUrl(e.target.value)}></input>

                <label>Job Domain<span style={{color:"red"}}>*</span></label>
                <select
                        value={jobDomain}
                        onChange={(e) => setJobDomain(e.target.value)}
                        className="domain-option"
                    >
                    <option value="">
                        Select a domain
                    </option>
                    {domains.map((domain,index) => (
                        <option key={index} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>

                <label>Expires Date<span style={{color:"red"}}>*</span></label>
                <input type="date" value={expiresIn} onChange={(e)=>setExpiresIn(e.target.value)}></input>

                <label>Do you want to send Email to the job Seekers</label>
                <select
                        value={newsLetterSent}
                        onChange={(e) => setNewsLetterSent(e.target.value)}
                        className="domain-option"
                    >
                    <option value={newsLetterSent}>
                        false
                    </option>
                    
                    <option value={newsLetterSent}>
                        true
                    </option>
                </select>
               
                <label>Company Logo</label>
                <input type="file" onChange={handleLogo}></input>

                <button onClick={handleFormSubmit}>Create</button>
             </div>
        </div>
    )
}

export default CreateJob;