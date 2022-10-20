import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: [],
    renderedRestaurants: [],
    restaurant: null,
    sortMarker: [],
}

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        getAllRestaurants(state, action) {
            state.restaurants = action.payload
            state.renderedRestaurants = action.payload
        },
        getOneRestaurant(state, action) {
            state.restaurant = action.payload
        },
        cleanRestaurantState(state) {
            state.restaurant = null
        },
        
        //---SORT Y FILTRADO DE RESTAURANTES---
        filterRestaurants(state, { payload }) {

            switch (payload) {
                case 'Mejor puntuacion':
                    const sorted = state.renderedRestaurants.sort((a, b) => b.rating - a.rating)
                    state.renderedRestaurants = sorted
                    break
                case 'Tiempo de demora':
                    const delSorted = state.renderedRestaurants.sort((a, b) => b.delivery_time - a.delivery_time)
                    state.renderedRestaurants = delSorted
                    break
                case 'Foodify +':
                    const plusRestaurants = state.renderedRestaurants.filter((r) => r.plus === true)
                    state.renderedRestaurants = plusRestaurants
                    break
                case 'Delivery':
                    const deliveryRestaurants = state.renderedRestaurants.filter((r) => r.delivery === true)
                    state.renderedRestaurants = deliveryRestaurants
                    break
                case 'CLOSE':
                    //CALCULAR DISTANCIA DE USUARIO ACTUAL CON UBICACION DE RESTAURANTE Y DEVOLVER
                    //SERIA UN SORT
                    break
                case 'Pago Online':
                    const onlinePaymentRestaurants = state.renderedRestaurants.filter((r) => r.online_payment === true)
                    state.renderedRestaurants = onlinePaymentRestaurants
                    break
                case 'CLEAR':
                    state.renderedRestaurants = state.restaurants
                    break
                default:
                    const restaurants = state.renderedRestaurants
                    state.renderedRestaurants = restaurants
            }
        },
        setSortMarker(state, { payload }) {
            if (payload === 'CLEAR') {
                state.sortMarker = []
                return
            }
            if (state.sortMarker.includes(payload)) {
                const filterRemoval = state.sortMarker.filter(f => f !== payload)
                state.sortMarker = filterRemoval
                return
            }
            const sortTypes = ['Mejor puntuacion', 'Tiempo de demora', 'Menor costo de entrega']
            if (sortTypes.includes(payload)) {
                let resetSort = state.sortMarker
                for (let i = 0; i < sortTypes.length; i++) {
                    resetSort = resetSort.filter(e => e !== sortTypes[i])
                }
                resetSort.push(payload)
                state.sortMarker = resetSort
                return
            }

            state.sortMarker.push(payload)
        },
        searchRestaurant(state, { payload }) {
            state.renderedRestaurants = state.restaurants.filter(r => r.name.toLowerCase().startsWith(payload.toLowerCase()))
        }
    }
})

export const {
    getAllRestaurants,
    getOneRestaurant,
    cleanRestaurantState,
    filterRestaurants,
    setSortMarker,
    searchRestaurant,
    getRestCreds
} = restaurantsSlice.actions

export default restaurantsSlice.reducer