import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const jobSlice = createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        loading:false,
        error:null,
        message:null,
        singleJob:{},
        myJobs:[]
    },
    reducers:{
        requestForAllJobs(state,action)
        {
            console.log("In loading state")
             state.loading=true;
             state.error=null;
        },
        successForAllJobs(state,action)
        {
            state.loading=false;
            state.jobs = action.payload;
            console.log(`loading is stopped this is the payload ........ ${action.payload}`)
            state.error = null;
        },
        failureForAllJobs(state,action)
        {
            state.loading=false;
            state.error = action.payload;
        },
        requestMyJobs(state,action)
        {
            state.loading=true;
            state.error = action.payload;
        },
        successForMyJobs(state,action)
        {
            state.loading=false;
            state.myJobs=action.payload.data;
        },
        failureForMyJobs(state,action)
        {
            state.loading = false;
            state.error = action.payload;
        },
        requestForSingleJob(state,action)
        {
            console.log("In loading state")
             state.loading=true;
             state.error=null;
        },
        successForSingleJob(state,action)
        {
            state.loading=false;
            state.singleJob = action.payload;
            state.message="fetched successfully"
            state.error = null;
        },
        failureForSingleJob(state,action)
        {
            state.loading=false;
            state.error = action.payload;
        },
        requestCreateJob(state,action)
        {
            state.loading=true;
            state.error = null;
        },
        successForCreateJob(state,action)
        {
            state.loading = false;
            state.message = action.payload.message;
        },
        failureForCreateJob(state,action)
        {
            state.loading = false;
            state.error  = action.payload;
        },
        requestDeleteJob(state,action)
        {
            state.loading=true;
            state.error = null;
        },
        successForDeleteJob(state,action)
        {
            state.loading = false;
            state.message = action.payload.message;
        },
        failureForDeleteJob(state,action)
        {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors(state,action)
        {
            console.log("All errors cleared..........")
            state.error=null;
        },
        resetJobSlice(state,action)
        {
            state.error = null;
            state.loading = false;
            state.message = null;
            state.singleJob =state.singleJob;
            state.jobs = state.jobs;
            state.myJobs=state.myJobs;
        }
    }
})


export const getMyJobs = ()=>async(dispatch)=>{
    try
    {
        dispatch(jobSlice.actions.requestMyJobs())
        const Link = `http://localhost:8080/api/v1/job/getmy`;
        const response = await axios.get(Link,{
            withCredentials:true,
        })
        dispatch(jobSlice.actions.successForMyJobs(response.data));
        dispatch(jobSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        dispatch(jobSlice.actions.failureForMyJobs(err.response?.data?.message))
    }
}

export const createJob = (data)=>async(dispatch)=>{
    try{
        dispatch(jobSlice.actions.requestCreateJob())
        const Link = `http://localhost:8080/api/v1/job/create`;
        const response = await axios.post(Link,data,{
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"},
        })
        console.log(response)
        dispatch(jobSlice.actions.successForCreateJob(response.data))
        dispatch(jobSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        console.log(err.response?.data?.message)
          dispatch(jobSlice.actions.failureForCreateJob(err.response?.data?.message))
    }
}

export const deleteJob = (id)=>async(dispatch)=>{
    try{
        dispatch(jobSlice.actions.requestDeleteJob())
        const Link = `http://localhost:8080/api/v1/job/delete/${id}`;
        const response = await axios.delete(Link,{
            withCredentials:true,
        })
        console.log(response)
        dispatch(jobSlice.actions.successForDeleteJob(response.data))
        dispatch(jobSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        dispatch(jobSlice.actions.failureForDeleteJob(err.response?.data?.message))
    }
}


export const fetchJobs = (city,domain,keyword)=>async(dispatch)=>{
    try{
        dispatch(jobSlice.actions.requestForAllJobs());
        let link = "http://localhost:8080/api/v1/job/getall?"
        let queryParams = []
        if(keyword)
        {
            queryParams.push(`keyword=${keyword}`)
        }
        if(city)
        {
            queryParams.push(`city=${city}`)
        }
        if(domain)
        {
            queryParams.push(`domain=${domain}`)
        }
        link = link + queryParams.join("&")
        console.log("I am in fetch jobs function in jobSlice")
        console.log(link)
        const response = await axios.get(link,{withCrenditals:true})
        dispatch(jobSlice.actions.successForAllJobs(response.data.jobs))
        dispatch(jobSlice.actions.clearAllErrors())
    }
    catch(error)
    {
        dispatch(jobSlice.actions.failureForAllJobs(error.response?.data?.message))
    }
}

export const fetchSingleJob = (JobId)=>async(dispatch)=>{
    try{
         dispatch(jobSlice.actions.requestForSingleJob())
         const Link = `http://localhost:8080/api/v1/job/getone/${JobId}`
         const response = await axios.get(Link,{
            withCredentials:true
         })
         dispatch(jobSlice.actions.successForSingleJob(response.data.job))
    }
    catch(err)
    {
        dispatch(jobSlice.actions.failureForSingleJob(err.response?.data?.message))
    }
}


export const clearAllJobErrors = ()=>(dispatch)=>{
    dispatch(jobSlice.actions.clearAllErrors());
};

export const resetForJobSlice = ()=>(dispatch)=>{
    dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;