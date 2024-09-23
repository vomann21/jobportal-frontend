import logo from './logo.svg';
import './App.css';
import {Router,Routes,Route,navigate, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import PostApplication from './pages/PostApplication'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {getUser,clearAllUserErrors, signOut} from './store/slices/userSlice'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
   const dispatch = useDispatch()
  
  const {error} = useSelector((state)=>state.user)
  useEffect(()=>{
        console.log("I entered the App and in the useEffect again i will not come this side...")
        dispatch(getUser())
  },[])

  return (
    <div className="App">
       <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/jobs' element={<Jobs></Jobs>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/post/application/:jobId' element={<PostApplication></PostApplication>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
       </Routes>
       
       <ToastContainer/>
    </div>
  );
}

export default App;