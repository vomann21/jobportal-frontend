import { useDispatch, useSelector } from "react-redux"
import DefaultImg from '../data/images/companylogo1.png'
import { BsBuildingsFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { GiCash } from "react-icons/gi"
import { useEffect } from "react";
import { clearAllJobErrors, getMyJobs, resetForJobSlice,deleteJob } from "../store/slices/jobSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyJobs = ()=>{
    const {myJobs,error,message}= useSelector((state)=>state.jobs)
    const {user,isAuthenticated}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
         dispatch(getMyJobs())
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
            })
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
            })
            dispatch(resetForJobSlice())
            dispatch(getMyJobs())
        }
    },[error,message])
    
    const handleDeleteJob = (id)=>{
         dispatch(deleteJob(id))
    }
    return(
        <div>
          {
             myJobs && myJobs.length > 0 ?
            (<div className='card-flex'>
                      {
                          myJobs.map((job)=>{
                               return <div key={job._id}>
                                      
                                      <div className='card'>
                                          <div className='card-top'>
                                              <div className='logo-title'>
                                                    {job.logo && job.logo.url ? <img src={job.logo.url} alt=''></img>:<img src={DefaultImg}></img>}
                                                    <ul className='title'>
                                                      <li className='title-li'><BsBuildingsFill className='company-icon'/>{job.companyName}</li>
                                                      <li className='title-li'><span>Role: </span>{job.title}</li>
                                                    </ul>
                                              </div>
                                              <div className='ends-on'>
                                                    {Date.now() > new Date(job.expiresIn).getTime() ? <div className='expired'>Expired</div>:<div className='not-expired'>
                                                           DeadLine:{new Date(job.expiresIn).toISOString().split('T')[0]}
                                                      </div>}
                                              </div>
                                          </div>
                                           <div className='details'>
                                               <div className='details-list' style={{display:"flex", flexDirection:"column"}}>
                                                     <ul className='details-list-ul'>
                                                          <li>Domain: {job.jobDomain}</li>
                                                          <li>Type: {job.jobType}</li>
                                                          <li><FaLocationDot className='details-icon'/>{job.location}</li>
                                                          <li><GiCash className='details-icon'/>{job.salary}</li>
                                                     </ul>
                                                     <textarea style={{margin:"auto", width:"90%",resize:"vertical",marginBottom:"4px"}} value={job.responsibilities} disabled>{job.responsibilities}</textarea>
                                                     <textarea style={{margin:"auto", width:"90%",resize:"vertical"}}  value={job.qualifications} disabled></textarea>
                                                     {
                                                     isAuthenticated && user.role == "Employer" &&
                                                     <button className='apply-button' style={{margin:"auto",marginTop:"1rem"}} onClick={()=>handleDeleteJob(job._id)}>
                                                         Delete
                                                     </button>
                                                     }
                                               </div>
                                           </div>
                                      </div>
                               </div>
                          })
                      }
                  </div>):(<div>No Jobs found</div>)
           }
        </div>
    )
}

export default MyJobs;