import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getFavoritesRestaurantsURL } from '../../assets/endpoints'

import s from './FavoriteSideBar.module.css'



const FavoritesSideBar = ({toggle}) => {

    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [favs, setFavs] = useState([])

    useEffect(() => {
        if(user){
            console.log(user)
            axios.get(getFavoritesRestaurantsURL(user.id))
                .then(r => {
                    console.log(r.data.favs)
                    setFavs(r.data.favs)})

        }
    }, [user])

    return (
        <>
        {favs.length?favs.map((r,i)=>(<div key={i} onClick={()=>{navigate(`/restaurantes/${r.id}`)}} className={s.order_cont}>
            <div  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img style={{width:30, height:30,marginLeft:40, borderRadius:5}}src={r.image} alt="res" />
            </div>
            <div>{r.name}</div>
        </div>))
        :<></>}
        </>
    )
}

export default FavoritesSideBar