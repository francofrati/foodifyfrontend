import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    foods: [],
    foodsCopy: [],
    diets: [],
    searchEmpty: false,
    foodsRestaurant: [],
    filterObject: {}
}

const foodSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {
        getFoods(state, action) {
            state.foods = action.payload
            state.foodsCopy = action.payload
            
        },
        getDiets(state, action) {
            state.diets = action.payload
        },
        getFoodsRestaurant(state, action){
            state.foodsCopy = action.payload
            state.foodsRestaurant = action.payload
        },
        searchFood(state, action) {
            if(action.payload.length === 0) {

                state.searchEmpty = true;
                state.foodsRestaurant = action.payload
            }
            else {
                state.searchEmpty = false;
                state.foodsRestaurant = action.payload
            }
        },
        resetSearch(state, action) {
            state.foodsRestaurant = state.foodsCopy
            state.searchEmpty = false
        },
        cleanFoodsState(state, action) {
            state.foodsRestaurant = []
        },
        resetFilters(state, action) {
            state.foods = state.foodsCopy
            state.foodsRestaurant = state.foodsCopy
            state.searchEmpty = false
            state.filterObject = {}
        },
        saveFilterObject(state, action) {
            state.filterObject[action.payload.key] = action.payload.value
        },
        resetObjectFilter(state, action) {
            state.filterObject = {}
        },
        getFoodById(state, action) {
            state.foodById = action.payload
        }
    }
})

export const { 
    getFoods,
    getDiets,
    searchFood,
    resetSearch,
    getFoodsRestaurant,
    cleanFoodsState,
    resetFilters,
    saveFilterObject,
    resetObjectFilter,
    getFoodById
 } = foodSlice.actions

export default foodSlice.reducer