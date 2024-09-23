import react from "react"
import { useDispatch, useSelector } from "react-redux"
import './Dashboard.css'
import {signOut} from '../store/slices/userSlice'
import { useState,useEffect } from "react"
import Applications from '../components/Applications'
import Footer from '../components/Footer'
import { toast } from "react-toastify"
import CreateJob from "../components/CreateJob"
import MyJobs from '../components/MyJobs'
import Profile from '../components/Profile'
import UpdatePassword from '../components/UpdatePassword'
import UpdateProfile from '../components/UpdateProfile'
import MyApplications from "../components/MyApplications"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = ()=>
{
     const {user} = useSelector((state)=>{return state.user})
     const [clicked,setClicked]=useState('My Profile')
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const LogOut=()=>
     {
         dispatch(signOut())
         toast.success("logout successful...",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         })
         navigate('/')
     }
     return(
        <div className="dashboard-container">
              <div className="dashboard-header">
                  <div>Dashboard</div>
                  <div>Welcome! <span style={{color:"green",fontWeight:"bold"}}>{user && user.name}</span></div>
              </div>
              <div className="dashboard-body">
                    <div className="dashboard-links">
                         <ul>
                            <li onClick={()=>setClicked('My Profile')}>My Profile</li>
                            <hr></hr>
                            <li onClick={()=>setClicked('Update Profile')}>Update Profile</li>
                            <hr></hr>
                            <li onClick={()=>setClicked('Update Password')}>Update Password</li>
                            <hr></hr>
                            {user.role=='Employer' && <><li onClick={()=>setClicked('Job Post')}>Job Post</li>
                            <hr></hr></>}
                            {user.role=='Employer' && <><li onClick={()=>setClicked('My Jobs')}>My Jobs</li>
                                <hr></hr></>}
                            {user.role=='Employer' && <><li onClick={()=>setClicked('Applications')}>Applications</li>
                                <hr></hr></>}
                            {user.role=='Job Seeker' && <><li onClick={()=>setClicked('My Applications')}>My Applications</li>
                                <hr></hr></>}
                            <li onClick={LogOut}>Logout</li>
                         </ul>
                    </div>
                    <div className="dashboard-component">
                          { 
                            ( ()=>{
                                 switch(clicked)
                                 {
                                    case 'My Profile':
                                        return <Profile></Profile>
                                        break;
                                    case 'Update Profile':
                                        return <UpdateProfile></UpdateProfile>
                                        break;
                                    case 'Update Password':
                                        return <UpdatePassword></UpdatePassword>
                                        break;
                                    case 'Applications':
                                        return <Applications></Applications>
                                        break;
                                    case 'My Applications':
                                        return <MyApplications></MyApplications>
                                        break;
                                    case 'Job Post':
                                        return <CreateJob></CreateJob>
                                        break;
                                    case 'My Jobs':
                                        return <MyJobs></MyJobs>
                                        break;
                                    default:
                                        return <Profile></Profile>
                                 }
                             })()
                          }
                    </div>
              </div>
              
        </div>
     )
}

export default  Dashboard