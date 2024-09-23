import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:{},
        isRegistered:false,
        isAuthenticated:false,
        loading:false,
        error:null,
        message:null,
        errCode:null,
    },
    reducers:{
        requestForRegister(state,action)
        {
            state.loading=true;
            state.isRegistered=false;
            state.user={}
            state.error=null;
            state.message=null;
        },
        successfullRegister(state,action)
        {
            state.loading=false;
            state.isRegistered=true;
            state.user=action.payload.user;
            state.error=null;
            state.message=action.payload.message;
        },
        failureRegister(state,action)
        {
            state.isRegistered=false;
            state.loading=false;
            state.user={};
            state.error=action.payload;
            state.message=null;
            console.log(state.error)
        },
        clearAllErrors(state,action)
        {
            state.error=null;
            state.user=state.user;
        },

        requestForLogin(state,action)
        {
            state.loading=true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
            state.message=null;
        },
        successfullLogin(state,action)
        {
            state.loading=false;
            state.isAuthenticated=true;
            state.error=null;
            state.message=action.payload.message;
            state.user = action.payload.user;
        },
        failureLogin(state,action)
        {
            state.isAuthenticated=false;
            state.loading=false;
            state.error=action.payload;
            state.user={};
            state.message=null;
        },
        requestForUser(state,action)
        {
            state.loading=true;
            state.error=null;
            state.isAuthenticated=false;
            state.user={};
        },
        successForUser(state,action)
        {
            state.loading=false;
            state.isAuthenticated=true;
            state.error=null;
            state.user = action.payload;
        },
        failureForUser(state,action)
        {
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=false;
            
        },
        successForLogout(state,action)
        {
            state.user={};
            state.error=null;
            state.isAuthenticated=false;
        },
        failureForLogout(state,action)
        {
            state.isAuthenticated=state.isAuthenticated;
            state.error = action.payload;
            state.user=state.user;
        },
        setStatus(state,action)
        {
            state.errCode=action.payload;
        }
    }
})

export const register = (data) =>async(dispatch)=>{
    console.log(data)
    dispatch(userSlice.actions.requestForRegister())
    try
    {
        let link = "http://localhost:8080/api/v1/user/register";
        const response = await axios.post(link,data,{
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"},
        });
        console.log("response is",response)
        dispatch(userSlice.actions.successfullRegister(response.data))
        dispatch(userSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        
        dispatch(userSlice.actions.failureRegister(err.response?.data?.message))
    }
}

export const clearAllUserErrors = ()=>(dispatch)=>{
    dispatch(userSlice.actions.clearAllErrors());
};

//login..................
export const login = (data)=> async(dispatch)=>{
    try{
        dispatch(userSlice.actions.requestForLogin())
        let link = "http://localhost:8080/api/v1/user/login"
        const response = await axios.post(link,data,{
            withCredentials:true,
            headers:{"Content-Type":"application/json"},
        }) 
        console.log(response)
        dispatch(userSlice.actions.successfullLogin(response.data))
        dispatch(userSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        
        dispatch(userSlice.actions.failureLogin(err.response?.data?.message))
    }
}


export const getUser = () =>async(dispatch)=>{
    try{
        dispatch(userSlice.actions.requestForUser());
        const Link = `http://localhost:8080/api/v1/user/userdetails`;

        const response = await axios.get(Link,{
            withCredentials:true
        })
        
        dispatch(userSlice.actions.successForUser(response.data.user))
        dispatch(userSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        console.log("This is err")
        console.log(err)
        dispatch(userSlice.actions.setStatus(err.status))
        dispatch(userSlice.actions.failureForUser(err.response?.data?.message))
    }
}

export const signOut = ()=>async(dispatch)=>{
      try{
          const Link = `http://localhost:8080/api/v1/user/signout`;

          const response = await axios.get(Link,{
               withCredentials:true,
          })

          dispatch(userSlice.actions.successForLogout(response))
          dispatch(userSlice.actions.clearAllErrors())
      }
      catch(err)
      {
          dispatch(userSlice.actions.failureForLogout(err.response?.data?.message))
      }
}


export default userSlice.reducer;