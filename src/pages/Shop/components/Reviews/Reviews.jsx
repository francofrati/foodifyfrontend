import axios from 'axios'
import React,{ useEffect } from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'

import { reviewRestURL } from '../../../../assets/endpoints'

import s from './Reviews.module.css'

const Review =({name,rate,content})=>{
    return(
        <div className={s.review_cont}>
            <div className={s.rate} >{rate}</div>
            <div className={s.content} >{content}</div>
            <div className={s.name} >{name}</div>
        </div>
    )
}

const Reviews = () => {


    const[reviews,setReviews]=useState([])

    const params = useParams()
    const {id} = params

    useEffect(()=>{
        axios.get(reviewRestURL(id))
        .then(r=>{
            setReviews(r.data.reviews)
        })
        .catch(e=>console.log(e))
    },[])

    return (
        <div>
            <div>
                <h1>Opiniones de tus clientes</h1>
            </div>
            <div>
                {reviews.length
                ?reviews.map(r=><Review name={r.user_id.name} rate={r.rate} content={r.content} />)
                :<></>
            }
            </div>
        </div>
    )
}

export default Reviews