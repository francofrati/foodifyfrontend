import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiets, fetchFilteredFoods } from '../../Redux/thunks/filterThunks'
import { resetFilters, saveFilterObject, resetObjectFilter } from '../../Redux/slices/foodSlice'
import { fetchFoodsRestaurant } from '../../Redux/thunks/foodsThunks'
import SearchBar from '../SearchBar/SearchBar'

const HeaderRestaurant = () => {
    const dispatch = useDispatch()
    const { diets } = useSelector((state) => state.foods)
    const { filterObject } = useSelector((state) => state.foods)
    const { searchEmpty } = useSelector((state) => state.foods)

    let filterValues = Object.values(filterObject);

    const handleOnClick = (e) => {
        dispatch(saveFilterObject({ key: e.target.name, value: e.target.value }))
    }

    const handleReset = () => {
        dispatch(resetObjectFilter())
        dispatch(resetFilters())
    }

    const handleFilters = () => {
        dispatch(fetchFilteredFoods(filterObject))
    }
    useEffect(() => {
        if(diets.length === 0) {
            dispatch(fetchDiets())
        }
    }, [dispatch])

    return(
        <div>
            <header>
                <div>
                    <ul>
                        <li>
                            Diets
                            <ul>
                                {diets.map((diet) => (
                                    <li>
                                        <button name='diet' value={diet} onClick={handleOnClick}>
                                            {diet}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            Sort
                            <ul>
                                <li>
                                    <button name='sort' value='AZ' onClick={handleOnClick}>
                                        A-Z
                                    </button>
                                </li>
                                <li>
                                    <button name='sort' value='ZA' onClick={handleOnClick}>
                                        Z-A
                                    </button>
                                </li>
                                <li>
                                    <button name='sort' value='lowest to highest' onClick={handleOnClick}>
                                        Lowest to highest
                                    </button>
                                </li>
                                <li>
                                    <button name='sort' value='highest to lowest' onClick={handleOnClick}>
                                        Highest to lowest
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div>
                    {filterValues.length
                        ? filterValues.map((filter) => <span>{filter}</span>)
                        : null}
                    {filterValues.length ? (
                        <button onClick={handleFilters}>Filter</button>
                    ) : null}
                    {filterValues.length ? (
                        <button onClick={handleReset}>Reset</button>
                    ) : null}
                </div>

            </header>
        </div>
    )

}

export default HeaderRestaurant