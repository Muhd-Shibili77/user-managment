import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice.jsx'
import adminReducer from '../redux/adminSlice.jsx'
 const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin:adminReducer,
    },
  });

  export default store;