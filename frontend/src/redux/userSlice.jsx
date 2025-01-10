import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async(query)=>{
        const usertoken = sessionStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/admin/users?name=${query}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${usertoken}` },
        });
     
       const data = await response.json();
       return data; 
    }
)

export const AddUser = createAsyncThunk(
    "users/addUser",
    async (newUser, { rejectWithValue }) => {
      try {
        const token = sessionStorage.getItem('token')
        const response = await fetch("http://localhost:3000/admin/addUser", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
  
        if (!response.ok) {
          const errorData = await response.json(); 
          return rejectWithValue(errorData.message); 
        }
  
        const data = await response.json();
        return data.user;
      } catch (error) {
        return rejectWithValue("An unexpected error occurred."); 
      }
    }
  );
  

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (updatedUser)=>{
      const token = sessionStorage.getItem('token')
        const response = await fetch( `http://localhost:3000/admin/users/${updatedUser._id}`,{
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedUser),
            }
          );
          const data = await response.json();
          return data;
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async(userId) =>{
      const token = sessionStorage.getItem('token')
         await fetch(`http://localhost:3000/admin/users/${userId}`, {
           method: "DELETE",
           headers: { Authorization: `Bearer ${token}` },
         });
         
          return {_id: userId};
    }
)

const userSlice = createSlice({
    name:'users',
    initialState : {
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })
        .addCase(AddUser.fulfilled,(state,action)=>{
            state.users.push(action.payload)
            state.error = null;
        })
        .addCase(AddUser.rejected,(state,action)=>{
            state.error = action.payload;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
           const index = state.users.findIndex((u)=>u._id === action.payload._id)
           if(index != -1) state.users[index]=action.payload
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.users = state.users.filter((u)=>u._id !== action.payload._id)
        })

    }

})


export default userSlice.reducer;     