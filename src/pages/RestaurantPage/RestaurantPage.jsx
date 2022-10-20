import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchOneRestaurant } from '../../Redux/thunks/restaurantsThunks'
import { cleanRestaurantState } from '../../Redux/slices/restaurantsSlice'
import Swal from 'sweetalert2'

import s from './RestaurantPage.module.css'
import { fetchAllFoods, fetchFoodsRestaurant } from '../../Redux/thunks/foodsThunks'
import SearchBar from '../../components/SearchBar/SearchBar'
import FoodList from '../../components/FoodList/FoodList'
import { cleanFoodsState } from '../../Redux/slices/foodSlice'
import Review from '../../components/Review/Review'
import { fetchCreds } from '../../Redux/thunks/userThunks'


const RestaurantPage = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const { restaurant } = useSelector(state => state.restaurants)

    const { foods, foodsRestaurant } = useSelector((state) => state.foods)
    useEffect(() => {
        if (foods.length === 0) {
            dispatch(fetchAllFoods());
        }
    }, [dispatch, foods]);


    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token){
            dispatch(fetchCreds(token))
        }
    }, [])

    useEffect(() => {
        dispatch(fetchOneRestaurant(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
            dispatch(cleanRestaurantState())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(cleanFoodsState())
    }, [])


    useEffect(() => {
        if (foodsRestaurant.length === 0) {
            dispatch(fetchFoodsRestaurant(id))

        }
    }, [dispatch, foodsRestaurant, id])


    if (restaurant) {
        document.title = `${restaurant.name} - Foodify`
    }


    const handleNavigate = (id) => {
        navigate(`/shopping/${id}`)
    }

    return (




        <div className={s.container}>
            {restaurant && <>
                <SearchBar />
                <div className={s.head}>
                    <div>
                        <h1 className={s.title}>{restaurant.name}</h1>
                    </div>
                    <div>
                        <img src={restaurant.image} alt={restaurant.name} className={s.logo} />
                    </div>
                </div>
                <div className={s.catalog_cont}>
                    <div className={s.food_container} >
                        {/* {products.map(p => {
                        return (
                            <div key={id} className={s.food_card}>
                                <div>
                                    <img src={p.img} alt={p.name} className={s.food} />
                                </div>
                                <div>
                                    <p className={s.name}>{p.name}</p>
                                    <p className={s.price}>${p.price}</p>
                                </div>
                            </div>
                        )
                    })} */}
                        <FoodList foods={foodsRestaurant} />
                    </div>

                </div>
            </>}
            <button onClick={() => handleNavigate(id)}>Proceed to checkout</button>


            {user ? <Review /> : <></>}

        </div>
    )
}

export default RestaurantPage