import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { admin: null, token: null },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      sessionStorage.setItem('token', action.payload.token);
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
