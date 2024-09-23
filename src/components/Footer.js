import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import { useSelector } from 'react-redux'
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
const Footer = () => {
  const {isAuthenticated} = useSelector((state)=>{
      return state.user;
  })
  return (
    <div className='footer'>
        <div className='support'>
            <div className='heading'>Support</div>
            <div>hitech city,Hyderabad,Telangana,India</div>
            <div>abc@gmail.com</div>
            <div>+91 9876543210</div>
        </div>
        <div className='quickLinks'>
           <div className='heading'>Quick Links</div>
            <Link to="/" className='link'>Home</Link>
            <Link to="/jobs" className='link'>Jobs</Link>
            {
             isAuthenticated && <Link to="/dashboard" className='link'>Dashboard</Link>
            }  
        </div>
        <div className='followUs'>
            <div className='heading'>Follow Us</div>
            <div><FaXTwitter className='icon'/> Twitter</div>
            <div><IoLogoInstagram className='icon'/> instagram</div>
            <div><FaYoutube className='icon'/> youtube</div>
            <div><CiLinkedin className='icon'/> LinkedIn</div>
        </div>
    </div>
  )
}

export default Footer