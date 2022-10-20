import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './PageNotFound.module.scss'
import img1 from './img1.svg'

const PageNotFound = () => {

const navigate = useNavigate()

    return(
        <div className={s.body}>
            <div className={s.container}>
            <img className={s.img} src={img1} alt="" />
            <h1 className={s.h1}>This page is not available</h1>
            <div className="boton">
            <button className={s.button} onClick={() => navigate('/')}>Go back</button>
        </div>
    </div>
        </div>
    )
}

export default PageNotFound