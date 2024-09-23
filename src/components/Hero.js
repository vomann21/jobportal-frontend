import React from 'react'
import './Hero.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {signOut} from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Hero = () => {
  
  const {isAuthenticated}= useSelector((state)=>{
       return state.user;
  })
  const dispatch = useDispatch()
  const logOut=()=>
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
    }
  return (
    <div className='hero'>
        <div className='hero-background'>
            <div className='hero-navbar'>
                <Link className='nav-link' to="/">Home</Link>
                <Link className='nav-link' to="/jobs">Jobs</Link>
                {!isAuthenticated?(<Link className='nav-link' to="/login">Login</Link>):(<><Link className='nav-link' to="/dashboard">Dashboard</Link> <Link className='nav-link' onClick={logOut}>Logout</Link></>)}
            </div>
            <div className='content'>
                <div>Jobs for You</div>
                <h3>The place where you can find your job.......</h3>
            </div>
        </div>
        <div className='about'>
            <div className='heading'>
                About
            </div>
            <div className='matter'>
                <p>Welcome to Jobs for You!, the place where opportunities meet talent. Whether you're starting your career or looking for the next big challenge, we've got the perfect job waiting for you.</p>
                <ul className='list'>
                    <li>Search across a wide range of industries and find the role that fits your skills and passion.</li>
                    <li>Create a compelling profile and let recruiters find you. Stand out with your skills and experience.</li>
                    <li>Never miss an opportunity—get customized job alerts straight to your inbox based on your preferences.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Hero