import axios from 'axios'
import { getFoods, getDiets, searchFood, getFoodsRestaurant, getFoodById } from '../slices/foodSlice'

const fetchAllFoods = () => (dispatch) => {
    axios.get("https://server-om6g.onrender.com/foods")
        .then((response) => {
            dispatch(getFoods(response.data.foods))
        })
        .catch((error) => console.log(error))
}

const fetchAllDiets = () => (dispatch) => {
    axios.get("https://server-om6g.onrender.com/foods/diets")
        .then((response) => {
            dispatch(getDiets(response.data.diets))
        })
        .catch((error) => console.log(error))
}

const fetchFoodsByTitle = (title) => (dispatch) => {
    axios.get(`https://server-om6g.onrender.com/foods?title=${title}`)
        .then((response) => {
            dispatch(searchFood(response.data.foods))
        })
        .catch((error) => console.log(error))
}


const fetchFoodsRestaurant = (idRestaurant) => (dispatch) => {
    axios.get(`https://server-om6g.onrender.com/foods/foodsRestaurant/${idRestaurant}`)
    .then((response) => {
        dispatch(getFoodsRestaurant(response.data.foods))
    })
    .catch((error) => console.log(error))
}

const fetchFoodById = (id) => (dispatch) => {
    axios
      .get(`/books/${id}`)
      .then((response) => {
        
        dispatch(getFoodById(response.data.food));
      })
      .catch((error) => console.log(error));
  };

export {
    fetchAllFoods,
    fetchAllDiets,
    fetchFoodsByTitle,
    fetchFoodsRestaurant,
    fetchFoodById
}