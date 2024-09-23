import React from "react";
import { useSelector } from "react-redux";
import './Profile.css'
const Profile = ()=>{
    const {user} = useSelector((state)=>state.user)
    return(
        <div className="profile-component">
            <label>Full Name</label>
            <input type="text" value={user.name} disabled></input>
            <label>Email Address</label>
            <input type="text" value={user.email} disabled></input>
            {
                user.role=='Job Seeker' &&
                <div>
                    <label>Domain</label>
                    <input type="text" value={user.domain.firstDomain} disabled></input>
                    {user.domain.secondDomain && <input type="text" value={user.domain.secondDomain} disabled></input>}
                    {user.domain.thirdDomain && <input type="text" value={user.domain.thirdDomain} disabled></input>}
                </div>
            }
            <label>Phone</label>
            <input type="phone" value={user.phone} disabled></input>

            <label>Address</label>
            <input type="text" value={user.address} disabled></input>
           {
            user.resume && user.resume.url && 
            <div>
                <label>Resume</label>
                <a href={user.resume.url} style={{color:"blue"}} target="_blank" rel="noopener noreferrer">
                Click here to download the resume
                </a>
            </div>
          }
          {
               user.coverletter && 
               <div>
                   <label>CoverLetter</label>
                   <textarea className="dashboard-textarea" type='text' value={user.coverletter} disabled></textarea>
               </div>
          }
            <label>Role</label>
            <input type="text" value={user.role} disabled></input>

            <label>Joined On</label>
            <input type="text" value={user && user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : 'N/A'}  disabled></input>
        </div>
    )
}

export default Profile;