import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice.jsx'
import adminReducer from '../redux/adminSlice.jsx'
import userReducer from '../redux/userSlice.jsx'
 const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin:adminReducer,
        users:userReducer,
    },
  });

  export default store;