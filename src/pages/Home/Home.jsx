import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllRestaurants } from "../../Redux/thunks/restaurantsThunks.js";
import SearchBarR from "./SearchBar/SearchBar.jsx";
import Filter from "./Filter/Filter.jsx";
import Restaurants from "../../components/Restaurants/Restaurants";

import s from './Home.module.css'
import { fetchCreds } from "../../Redux/thunks/userThunks.js";
import { useNavigate } from "react-router-dom";


const Home = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {

    if (user) {
      if (user.type === 'restaurant') navigate('/negocios')
    } else {
      const token = window.localStorage.getItem('token')
      if (token) {
        dispatch(fetchCreds(token))
      }
    }
  }, [])

  useEffect(() => {
    if (user && user.type === 'restaurant') navigate('/negocios')
  }, [user])

  useEffect(() => {
    dispatch(fetchAllRestaurants())
  }, [dispatch])

  return (
    <div className={s.container}>
      <SearchBarR />
      <div className={s.filter_rest_cont}>
        <Filter />
        <Restaurants />
      </div>
    </div>
  )
}

export default Home