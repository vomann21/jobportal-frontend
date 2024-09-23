import React from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Router,Routes,Route} from 'react-router-dom'
import {signOut} from '../store/slices/userSlice'
import Login from '../pages/Login'
const Navbar = () => {
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector((state)=>{
      return state.user;
  })
  const logOut=()=>
  {
       dispatch(signOut())
  }
  return (
    
    <div className='navbar'>        
                {!isAuthenticated?(<Link className='nav-link' to="/login">Login</Link>):(<><Link className='nav-link' onClick={logOut}>Logout</Link> <Link className='nav-link' to="/dashboard">Dashboard</Link></>)}
                <Link className='nav-link' to="/jobs">Jobs</Link>
                <Link className='nav-link' to="/">Home</Link>
    </div>
   
  )
}

export default Navbar