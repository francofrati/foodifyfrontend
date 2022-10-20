import React from 'react'
import { MdDeliveryDining } from 'react-icons/md'
import { FaCreditCard } from 'react-icons/fa'
import { AiOutlineClockCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import foodifypluslogo from '../../assets/foodify-plus.png'
import borrar from '../../assets/borrar.png'//imagen de mono donde irian las dos comidas mejor vendidas

import s from './CardRestaurante.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addFavoriteRestaurantURL, getFavoritesRestaurantsURL } from '../../assets/endpoints'
import { useEffect } from 'react'
import swal from 'sweetalert'
import { fetchCreds } from '../../Redux/thunks/userThunks'

const CardRestaurante = ({ name, image, plus, online, delivery, onclick, restId, favs, setFav }) => {

  const { user } = useSelector(state => state.user)

  const dispatch= useDispatch()

  const includedFav = () => {
    if (favs) {
      for (let i = 0; i < favs.length; i++) {
        if (favs[i].name === name) {
          return true
        }
      }

    }
  }

  useEffect(()=>{
    const token=window.localStorage.getItem('token')
    if(token){
      dispatch(fetchCreds(token))
    }
  },[])

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleFavorite = () => {

    if (!user) return

    const body = {
      restId,
      userEmail: user.email
    }


    axios.post(addFavoriteRestaurantURL, body)
      .then(r => {
        if (r.data.status) {
          axios.get(getFavoritesRestaurantsURL(user.id))
            .then(r => setFav(r.data.favs))
            .catch(error => console.log(error))
          swal({ title: r.data.msg, icon: 'success' })

        }
      })
      .catch(e => console.log(e))
  }



  return (
    <div className={s.cont} >
      <div onClick={onclick}>
        <div className={s.logo_cont}>
          <img className={s.logo} src={image} alt={name} />
        </div>
      </div>
      <div className={s.description_cont}>
        <div className={s.title_cont}>
          {user && includedFav()
            ? <div onClick={handleFavorite} style={{zIndex:10}}><AiFillHeart style={{ 'color': '#20B5E5', 'fontSize': '1.5rem' }} /></div>
            : <div onClick={handleFavorite} style={{zIndex:10}}><AiOutlineHeart style={{ 'color': '#20B5E5', 'fontSize': '1.5rem' }} /></div>}
          <span className={s.title} onClick={onclick}>{name}</span>
          {plus ? <img className={s.plus_logo} src={foodifypluslogo} alt={'plus'} /> : <></>}
        </div>
        <div onClick={onclick} className={s.options_foodimg_cont}>
          <div className={s.options_cont}>
            {online ? <span className={s.options}><FaCreditCard style={{ 'color': '#20B5E5', 'fontSize': '1.5rem' }} />Pagos Online</span> : <></>}
            {delivery ? <span className={s.options}><MdDeliveryDining style={{ 'color': '#20B5E5', 'fontSize': '1.5rem' }} />Delivery</span> : <></>}
            <span className={s.options}><AiOutlineClockCircle style={{ 'color': '#20B5E5', 'fontSize': '1.5rem' }} />Demora: 25-30min</span>
          </div>
          <div onClick={onclick} className={s.rest_foods_img_cont}>
            <div>
              <img className={s.rest_foods_img} src={borrar} alt={"borrar"} />
            </div>
            <div>
              <img className={s.rest_foods_img} src={borrar} alt={"borrar"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRestaurante