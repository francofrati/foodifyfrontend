import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserById } from '../../Redux/thunks/userThunks'
import s from './Reviews.module.scss'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const Reviews = () => {

    const dispatch = useDispatch()

    const { userById } = useSelector((state) => state.user)
    const info = jwt_decode(window.localStorage.token)
    const id = info.id

    useEffect(() => {
        dispatch(fetchUserById(id))
    }, [])

    const newReview = () => {
        if(userById){

        }
        else{
            alert('You must be login if you want to make a review')
        }
    }

    return(
        <div>
            <div className={s.container}>
                <h1>HOLAAA</h1>
            </div>
        </div>
    )
}

export default Reviews