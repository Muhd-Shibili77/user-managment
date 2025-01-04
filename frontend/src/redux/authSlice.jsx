import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      if (action.payload.user) {
        state.user = { ...state.user, ...action.payload.user }; 
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        sessionStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload; // Update only the profileImage field
      }
    },
  },
});

export const { setUser, logout,updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
