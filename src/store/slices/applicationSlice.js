import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const applicationSlice = createSlice({
    name:"applications",
    initialState:{
        loading:false,
        error:null,
        message:null,
        applications:[],
    },
    reducers:{
            requestForApplications(state,action)
            {
                 state.loading=true;
                 state.error=null;
            },
            successForApplications(state,action)
            {
                state.loading=false;
                state.applications=action.payload;
                state.error=null;
            },
            failureForApplications(state,action)
            {
                state.loading=false;
                state.error=action.payload;
            },
            requestForMyApplications(state,action)
            {
               state.loading=true;
               state.error=null;  
            },
            successForMyApplications(state,action)
            {
                 state.loading=false;
                 state.applications=action.payload.data;
            },
            failureForMyApplications(state,action)
            {
                state.loading=false;
                state.error =action.payload;
                state.message=action.payload;
            },
            requestForPostApplication(state,action)
            {
               state.loading=true;
               state.error=null; 
               state.message=null; 
            },
            successForPostApplication(state,action)
            {
                 state.loading=false;
                 state.error=null;
                 state.message=action.payload.message;
                 console.log(state.message)
            },
            failureForPostApplication(state,action)
            {
                state.loading=false;
                state.error =action.payload;
                state.message = null;
            },
            requestDeleteApplication(state,action)
            {
                state.loading=true;
            },
            successDeleteApplication(state,action)
            {
                state.loading=false;
                state.message=action.payload.message;
                state.error=null;
            },
            failureDeleteApplication(state,action)
            {
                state.loading=true;
                state.error=action.payload.error;
                state.message=null;
            },
            clearAllErrors(state,action)
            {
                state.loading=false;
                state.applications=state.applications;
                state.error=null;
            },
            resetApplicationSlice(state, action) {
                state.error = null;
                state.applications = state.applications;
                state.message = null;
                state.loading = false;
            },
    }
}) 

export const fetchJobSeekerApplication = ()=>async(dispatch)=>{
    try{
        dispatch(applicationSlice.actions.requestForMyApplications());
        const Link = `http://localhost:8080/api/v1/application/jobseeker/getall`;
        const response = await axios.get(Link,{
            withCredentials:true,
        })
        console.log(response);
        dispatch(applicationSlice.actions.successForMyApplications(response.data));
        dispatch(applicationSlice.actions.clearAllErrors());
    }
    catch(err)
    {
        dispatch(applicationSlice.actions.failureForMyApplications(err.response?.data?.message));
    }
}

export const fetchEmployerApplication = ()=>async(dispatch)=>{
    try{
        dispatch(applicationSlice.actions.requestForMyApplications());
        const Link = `http://localhost:8080/api/v1/application/employer/getall`;
        const response = await axios.get(Link,{
            withCredentials:true,
        })
        dispatch(applicationSlice.actions.successForMyApplications(response.data));
            dispatch(applicationSlice.actions.clearAllErrors());
    }
    catch(err)
    {
        dispatch(applicationSlice.actions.failureForMyApplications(err.response?.data?.message));
    }
}

export const deleteApplication = (id)=>async(dispatch)=>{
    try{
        dispatch(applicationSlice.actions.requestDeleteApplication())
        const Link = `http://localhost:8080/api/v1/application/delete/${id}`;
        const response = await axios.delete(Link,{
            withCredentials:true,
        })
        dispatch(applicationSlice.actions.successDeleteApplication(response.data))
        dispatch(applicationSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        dispatch(applicationSlice.actions.failureDeleteApplication(err.response?.data?.message))
    }
}

export const postApplication =(data,jobId)=>async(dispatch)=>{
        try{
            dispatch(applicationSlice.actions.requestForPostApplication());
            console.log("printing jobId in slice",jobId)
            const Link = `http://localhost:8080/api/v1/application/post/${jobId}`;
            const response = await axios.post(Link,data,{
                withCredentials:true,
                headers:{"Content-Type":"multipart/form-data"},
            })
            console.log("the response from backend is..",response)
            dispatch(applicationSlice.actions.successForPostApplication(response.data));
            dispatch(applicationSlice.actions.clearAllErrors());
        }
        catch(err)
        {
            console.log(err.response?.data?.message)
            dispatch(applicationSlice.actions.failureForPostApplication(err.response?.data?.message));
        }
}

export const clearAllApplicationErrors=()=>async(dispatch)=>{
      dispatch(applicationSlice.actions.clearAllErrors())
}

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer