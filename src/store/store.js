import {configureStore} from '@reduxjs/toolkit'
import jobReducer from './slices/jobSlice'
import userReducer from './slices/userSlice'
import applicationReducer from './slices/applicationSlice'
import updateReducer from './slices/updateSlice'
const Store = configureStore({
    reducer:{
        jobs:jobReducer,
        user:userReducer,
        applications:applicationReducer,
        update:updateReducer,
    }
})

export default Store