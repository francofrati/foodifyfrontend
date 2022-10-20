import axios from 'axios'

import { getAllRestaurants, getOneRestaurant } from '../slices/restaurantsSlice'
import { allRestaurantsURL, oneRestaurantURL } from '../../assets/endpoints'

const fetchAllRestaurants = () => (dispatch) => {
    axios.get(allRestaurantsURL)
        .then((response) => {
            dispatch(getAllRestaurants(response.data))
        })
        .catch((error) => console.log(error))
}

const fetchOneRestaurant = (id) => (dispatch) => {
    axios.get(oneRestaurantURL(id))
        .then((response) => {
            dispatch(getOneRestaurant(response.data))
        })
        .catch((error) => console.log(error))
}



export {
    fetchAllRestaurants,
    fetchOneRestaurant,
}