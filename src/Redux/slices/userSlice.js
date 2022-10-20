import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    user: null,
    users: [],
    userById:{}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsers(state, action) {
            state.users = action.payload;
          },
          getUserById (state, action) {
            // state.userById = action.payload[0];
            state.userById = action.payload;
            localStorage.setItem("usuario", JSON.stringify(state.userById))
          },
        getUserCreds(state, action) {
            state.user = action.payload
        }
    }
})

export const { 
    getUsers,
    getUserById,
    getUserCreds
 } = userSlice.actions

export default userSlice.reducer