import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateSlice = createSlice({
    name:"update",
    initialState:{
        updatedUser:{},
        loading:false,
        error:null,
        message:null,
    },
    reducers:{
         requestUpdateProfile(state,action)
         {
              state.loading=true;
              state.error=null;
         },
         successUpdateProfile(state,action)
         {
             state.loading=false;
             state.message=action.payload.message;
             state.updatedUser=action.payload.data;
         },
         failureUpdateProfile(state,action)
         {
            console.log(action.payload)
            state.loading=false;
            state.error=action.payload;
         },
         requestUpdatePassword(state,action)
         {
            state.loading=true;
         },
         successUpdatePassword(state,action)
         {
            state.loading=false;
            state.error=null;
            state.message = action.payload;
         },
         failureUpdatePassword(state,action)
         {
            state.loading=false;
            state.error = action.payload;
         },
         clearAllErrors(state,action)
         {
            state.loading=false;
            state.error=null;
         },
         resetSlice(state,action)
         {
            state.loading=false;
            state.error=null;
            state.updatedUser={};
            state.message=null;
         }
    }
})

export const profileUpdate=(data)=>async(dispatch)=>{
    try{
        console.log("The data is",data)
        dispatch(updateSlice.actions.requestUpdateProfile())
        const Link = `http://localhost:8080/api/v1/user/update/profile`;
        const response = await axios.put(Link,data,{
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"},
        })

        dispatch(updateSlice.actions.successUpdateProfile(response.data))
        dispatch(updateSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        console.log(err)
        dispatch(updateSlice.actions.failureUpdateProfile(err.response?.data?.message))
    }
}

export const updatePassword = (data)=>async(dispatch) =>{
    try{
        console.log(data)
        dispatch(updateSlice.actions.requestUpdatePassword())
        const Link = `http://localhost:8080/api/v1/user/update/password`;
        const response = await axios.put(Link,data,{
            withCredentials:true,
        })
        dispatch(updateSlice.actions.successUpdatePassword(response.data.message))
        dispatch(updateSlice.actions.clearAllErrors())
    }
    catch(err)
    {
        dispatch(updateSlice.actions.failureUpdatePassword(err.response?.data?.message))
    }
}

export const clearAllUpdateErrors=()=>(dispatch)=>{
     dispatch(updateSlice.actions.clearAllErrors())
}

export const resetUpdateSlice = ()=>(dispatch)=>{
    dispatch(updateSlice.actions.resetSlice())
}

export default updateSlice.reducer;