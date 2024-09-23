import React from 'react'
import './Features.css'
import CreateJob from '../data/images/interview1.jpg'
import Email from '../data/images/email.png'
const Features = () => {
  return (
    <div className='features'>
        <div className='header'>
            Features
        </div>
        <div className='cards'>
            <div className='card'>
                <div className='card-image-div'>
                    <img className="card-img" src='/images/about-img1.png'></img>
                </div>
                <div className='information'>
                    Search across a wide range of industries and find the role that fits your skills and passion.
                    Many organisations create jobs for you, apply according to your intrest.
                </div>
            </div>
            <div className='card'>
                    <div className='card-image-div'>
                        <img className="card-img" src={CreateJob}></img>
                    </div>
                    <div className='information'>
                        Create job if your an employer.Create opportunities for the job seekers who fits for the role and projects.
                    </div>
            </div>
            <div className='card'>
                    <div className='card-image-div'>
                        <img className="card-img" src={Email}></img>
                    </div>
                    <div className='information'>
                        Get the new jobs which suits you into your mail inbox.Now you will get notification on new jobs which suits your domain.
                    </div>
            </div>
        </div>
        
    </div>
  )
}

export default Features