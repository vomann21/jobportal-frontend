import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { FaSearch } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { GiCash } from "react-icons/gi"
import Spinner from '../components/Spinner';
import { fetchJobs,clearAllJobErrors } from '../store/slices/jobSlice';
import cities  from '../data/cities';
import domains from '../data/domains';
import {Link} from 'react-router-dom';
import { getUser } from '../store/slices/userSlice';
import './Jobs.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import DefaultImg from '../data/images/companylogo1.png'

const Jobs = () => {

  const[city,setCity] = useState("")
  const[selectedCity,setSelectedCity] = useState("")
  const[domain,setDomain] = useState("")
  const[selectedDomain,setSelectedDomain] = useState("")
  const[searchKeyword,setSearchKeyword] = useState("")

  const {jobs,error,loading} = useSelector((state)=>{
      return state.jobs
  })


  const {isAuthenticated,user} = useSelector((state)=>{
        
        return state.user
  })

  const dispatch = useDispatch()

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
        if(error)
           dispatch(clearAllJobErrors())
      }
      else
        dispatch(fetchJobs(city,domain,searchKeyword)) 
      console.log("I am here in useEffect")
  },[dispatch,error])


  const handleChangeCity = (e)=>
  {
      setCity(e.target.value)
  }

  const handleChangeDomain = (e)=>{
      setDomain(e.target.value)
  }

  const handleChangesearchKeyword = (e)=>{
      e.preventDefault();
      dispatch(fetchJobs(city,domain,searchKeyword))
  }


  return (
    <div>
          {loading ? <Spinner/>: 
            <div className='jobs'>
                  <Navbar></Navbar>
                  <div className='search-wrapper'>
                      <div className='domain-search'>
                          <div className='label' style={{marginBottom:"0"}}>Search by Domain</div>
                          <div className='dropdown'>
                          <select id="domain-dropdown" className="domain-dropdown" value={domain} onChange={handleChangeDomain}>
                                    <option value="">Select a Domain</option>
                                    {console.log(domains)}
                                    {domains.map((domain,index)=>{
                                          return <option key={index} value={domain}>
                                                      {domain}
                                                </option>
                                    })}
                            </select>
                          </div>
                      </div>
                       
                      <div className='city-search'>
                          <div className='label'>Search by city</div>
                          <div className='dropdown'>
                          <select id="city-dropdown" className="city-dropdown" value={city} onChange={handleChangeCity}>
                                    <option value="">Select a city</option>
                                    {console.log(cities)}
                                    {cities.map((city,index)=>{
                                          return <option key={index} value={city}>
                                                      {city}
                                                </option>
                                    })}
                              </select>
                          </div>
                      </div>
                       
                      <form onSubmit={handleChangesearchKeyword}  style={{marginTop:"1rem"}} className='keyword-search'>
                          <div className='label'>Search by keyword</div>
                          <input className='search-wrapper-input' type='text' value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)} placeholder='type a keyword'></input>
                      </form>
                  </div>
                  
                  <div className='button-search'>
                    <button className='btn-search-wrapper' onClick={handleChangesearchKeyword}>SearchJobs <FaSearch className='search-icon'/></button>
                    
                  </div>
                         
                  

                  {console.log(`this are the jobs ${jobs[0]}`)}
                  <div className='card-flex'>
                      {
                          
                          jobs.map((job)=>{
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
                                               <div className='details-list'>
                                                     <ul className='details-list-ul'>
                                                          <li>Domain: {job.jobDomain}</li>
                                                          <li><FaLocationDot className='details-icon'/>{job.location}</li>
                                                          <li><GiCash className='details-icon'/>{job.salary}</li>
                                                     </ul>
                                                     {
                                                     isAuthenticated && user.role != "Employer" &&
                                                     <button className='apply-button'>
                                                         <Link className="apply-button-link" to={`/post/application/${job._id}`}>Apply Now</Link>
                                                     </button>
                                                     }
                                               </div>
                                           </div>
                                      </div>
                               </div>
                          })
                      }
                  </div>
            </div>}
    </div>
  )
}

export default Jobs