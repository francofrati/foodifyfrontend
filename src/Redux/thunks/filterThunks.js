import axios from 'axios'
import { getDiets, searchFood } from '../slices/foodSlice.js'

const fetchDiets = () => (dispatch) => {
    axios.get("/foods/diets")
    .then((response) => dispatch(getDiets(response.data.diets)))
    .catch((error) => console.log(error))
}

const fetchFilteredFoods = (filters) => (dispatch) => {
    console.log(filters)
    axios.get(`/foods?diet=${filters.diet ? filters.diet : ''}&sort=${filters.sort ? filters.sort : ''}&price=${filters.price ? filters.price : ''}`
    )
    .then((response) => dispatch(searchFood(response.data.foods)))
    .catch((error) => console.log(error))
}

export { fetchDiets, fetchFilteredFoods }