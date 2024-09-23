import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllApplicationErrors, fetchEmployerApplication, resetApplicationSlice,deleteApplication } from "../store/slices/applicationSlice";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'
import { ImFilesEmpty } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import DefaultImg from '../data/images/companylogo1.png'
const Applications = ()=>{
    const {error,message,applications} = useSelector((state)=>state.applications)
    
    console.log(applications)
    const dispatch = useDispatch()
    useEffect(()=>{
            dispatch(fetchEmployerApplication())     
    },[])
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
                  dispatch(clearAllApplicationErrors())
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
              dispatch(resetApplicationSlice()) 
              dispatch(fetchEmployerApplication()) 
        }
    },[dispatch,error,message])
    
    const handleDeleteApplication=(id)=>{
         console.log(id)
         dispatch(deleteApplication(id))
    }
    return(
        <div className="myAppication">
                    {(applications && applications.length<=0) ? <div style={{display:"flex",textAlign:"center",justifyContent:"center",marginRight:"7rem"}} className="not-found"><ImFilesEmpty style={{fontSize:"5rem",color:"blue"}} className="icon"/> <h2 style={{marginBottom:"12rem"}}>No Applications found</h2></div> : applications.map((application)=>{
                            return <div className="application" key={application._id}>
                                 <div className="title">
                                    <div className="title-logo">
                                        {
                                          application.jobInfo.logo && application.jobInfo.logo.url ?
                                          <img className="title-logo-img" src={application.jobInfo.logo.url}></img>:
                                          <img className="title-logo-img" src={DefaultImg}></img>
                                        }
                                        <div className="name">
                                            {application.jobInfo.companyName && <div>{application.jobInfo.companyName}</div> }
                                            <div>{application.jobInfo.jobTitle}</div>
                                            {application.jobInfo.type ? <div>{application.jobInfo.type}</div>:<div>NA</div>}
                                        </div>
                                    </div>
                                    <div>AppliedOn: {new Date(application.jobSeekerInfo.appliedOn).toISOString().split('T')[0]}</div>
                                 </div>
                                 <div className="info" style={{marginTop:"1rem"}}>
                                        <div>Name of the Applicant: <span style={{color:"green"}}>{application.jobSeekerInfo.name}</span></div>
                                        <div>Email Id: <span style={{color:"green"}}>{application.jobSeekerInfo.email}</span></div>
                                        <div>phone: <span style={{color:"green"}}>{application.jobSeekerInfo.phone}</span></div>
                                        <textarea value={application.jobSeekerInfo.coverLetter} disabled>{application.jobSeekerInfo.coverLetter}</textarea>
                                        <div className="end-area">
                                            { application.jobSeekerInfo.resume && application.jobSeekerInfo.resume.url && <a href={application.jobSeekerInfo?.resume?.url} target="_blank" rel="noopener noreferrer">Resume</a> }
                                            
                                            <MdDeleteOutline className="icon" onClick={()=>handleDeleteApplication(application._id)}/>
                                        </div>
                                 </div>
                            </div>
                    })}
        </div>
    )
}

export default Applications;