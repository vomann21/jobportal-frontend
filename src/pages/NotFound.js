import React from 'react'
import './NotFound.css'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='not-found'>
        <div className='content'>
              <div className='content-1'>404 NOT FOUND</div>
              <div className='content-2'>The page visited is not found.Please go back to home page</div>
        </div>
        <button><Link to={'/'}>Home</Link></button>
    </div>
  )
}

export default NotFound