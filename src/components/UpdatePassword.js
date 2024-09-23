import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { updatePassword,clearAllUpdateErrors,resetUpdateSlice } from '../store/slices/updateSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import './UpdateProfile.css'
const UpdatePassword = ()=>{
    const [password,setPassword] = useState('');
    const [newPassword,setNewPassword] = useState('')
    const [confirmNewPassword,setConfirmNewPassword] = useState('')
    const {error,message}  = useSelector((state)=>{
        return state.update;
    })
    const [show,setShow] = useState(false)
    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)

    const dispatch = useDispatch();
    const handleSubmitForm = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("password",password);
        formData.append("newPassword",newPassword);
        formData.append("confirmNewPassword",confirmNewPassword);
        dispatch(updatePassword(formData))
    }

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
                
              dispatch(clearAllUpdateErrors())
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
                });
                
              dispatch(resetUpdateSlice())
        }
    },[error,message])

    const handleSetShow=()=>{
        setShow(!show)
    }
    return(
        <div>
             <label>Password<span style={{color:"red"}}>*</span></label>
            <div className='input-container'>
                <input type={show ? "text":"password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}></input>{show ? <FaEyeSlash className="icon" onClick={handleSetShow}/>:<FaEye onClick={handleSetShow} className='icon'/>}
            </div>


            <label>New Password<span style={{color:"red"}}>*</span></label>
            <div className='input-container'>
             <input type={show1 ? "text":"password"} onChange={(e)=>{
                 setNewPassword(e.target.value)
             }}></input>{show1 ? <FaEyeSlash className="icon" onClick={(e)=>setShow1(!show1)}/>:<FaEye onClick={(e)=>setShow1(!show1)} className='icon'/>}
            </div>


            <label>Confirm New Password<span style={{color:"red"}}>*</span></label>
            <div className='input-container'>
             <input type={show2 ? "text":"password"} onChange={(e)=>{
                 setConfirmNewPassword(e.target.value)
             }}></input>{show2 ? <FaEyeSlash className="icon" onClick={(e)=>setShow2(!show2)}/>:<FaEye onClick={(e)=>setShow2(!show2)} className='icon'/>}
            </div>

            <div className='update-btn-div'>
                <button className="update-btn" onClick={handleSubmitForm}>Update</button>
            </div>
        </div>
    )
}

export default UpdatePassword;