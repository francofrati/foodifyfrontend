import React, { useState } from 'react'

import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'

import s from './FoodList.module.scss'


const FoodList = ({ foods }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [foodsPerPage, setFoodsPerPage] = useState(6)
    const lastIndex = currentPage * foodsPerPage
    const firstIndex = lastIndex - foodsPerPage
    const currentFoods = foods.slice(firstIndex, lastIndex)

    if(currentPage > Math.ceil(foods.length / foodsPerPage) && currentPage !== 1) setCurrentPage(1)

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return(
        <div className={s.container}>
            <div>
                {currentFoods?.length === 0 && (
                    <div>No hay info</div>
                )}
            </div>

            <div className={s.foods}>
                {currentFoods.map((food) => {
                    return <Card id={food._id} title={food.title} image={food.image} price={food.price} rating={food.rating} key={food._id} food={food} className={s.tarjeta}/>
                })}
            </div>
            <div className={s.pagination}>
                <Pagination foodsPerPage={foodsPerPage} foods={foods} changePage={changePage} currentPage={currentPage}/>
            </div>
        </div>
    )
}

export default FoodList