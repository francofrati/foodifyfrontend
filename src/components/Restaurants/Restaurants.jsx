import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getFavoritesRestaurantsURL } from '../../assets/endpoints'

import { fetchAllRestaurants } from '../../Redux/thunks/restaurantsThunks'

import CardRestaurante from '../CardRestaurante/CardRestaurante'
import s from './Restaurants.module.css'


const Restaurants = () => {

    const navigate = useNavigate()

    const { renderedRestaurants } = useSelector((state) => state.restaurants)
    const {user} = useSelector(state=>state.user)

    const [level, setLevel] = useState(20)

    const [favs,setFavs] = useState([])

    const favsSet = (values)=>{
        setFavs(values)
    }

    const dispatch = useDispatch()

    const handleRestaurantRedirect = (id) => {
        navigate(`/restaurantes/${id}`)
    }

    useEffect(()=>{
        if(user){
            console.log(user)
          axios.get(getFavoritesRestaurantsURL(user.id))
          .then(r=>setFavs(r.data.favs))
          .catch(error=>console.log(error))
        }
      },[user])

    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [dispatch])

    return (
        <div className={s.cont}>
            {renderedRestaurants.length
                ? renderedRestaurants.slice(0, level).map((r) => {
                    return <CardRestaurante
                        name={r.name}
                        image={r.image}
                        key={r.id}
                        plus={r.plus}
                        delivery={r.delivery}
                        online={r.online_payment}
                        onclick={() => handleRestaurantRedirect(r.id)}
                        restId={r.id}
                        favs = {favs}
                        setFav = {favsSet}
                    />
                })
                : <>Cargando..</>
            }
            {renderedRestaurants.length > level
                ? <button className={s.btn_more} onClick={() => setLevel((prevState) => prevState + 20)}>Mostrar mas</button>
                : <></>
            }
        </div>
    )
}

export default Restaurants