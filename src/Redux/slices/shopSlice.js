import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    coordinates: []
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        getCoordinates(state, action) {
            state.coordinates = action.payload;
        }
    }
})

export const {
    getCoordinates
} = shopSlice.actions

export default shopSlice.reducer