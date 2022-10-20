import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'
import { searchRestaurant } from '../../../Redux/slices/restaurantsSlice'

import categories from '../../../assets/categories'
import foodifypluslogo from '../../../assets/foodify-plus.png'

import s from './SearchBar.module.css'

const SearchBar = () => {

    const navigate = useNavigate()

    const { restaurants } = useSelector(state => state.restaurants)

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)

    const [searchQuery, setSearchQuery] = useState('')

    const [searchPreview, setSearchPreview] = useState([])

    const handleChange = (e) => {

        const { value } = e.target

        setSearchQuery(value)

        const searchMatches = restaurants.filter(r => r.name.toLowerCase().startsWith(value.toLowerCase()))

        if (value === '') {
            setSearchPreview([])
        }
        if (searchMatches.length === restaurants.length) {
            setSearchPreview([])
        } else if (searchMatches.length < restaurants.length) {
            setSearchPreview(searchMatches)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(searchRestaurant(searchQuery))
        setSearchPreview([])
        
    }

    const handleRestaurantRedirect = (id) => {
        navigate(`/restaurantes/${id}`)
    }

    const handleCategory = () => { }

    useAuth()

    return (
        <>
            <div className={s.cont}>
                <div className={s.search_greet_cont}>

                    <div className={s.greet_cont}>
                        <p className={s.greet}>Hola {user ? user.name : ''}, que vas a pedir hoy?</p>
                    </div>

                    <form onSubmit={handleSearch} className={s.search_cont}>
                        <input
                            className={s.search_input}
                            type="text"
                            placeholder='Buscar en Foodify...'
                            value={searchQuery}
                            onChange={handleChange}
                        />
                        <FaSearch
                            className={s.search_icon}
                            style={{ 'color': '#20B5E5' }}
                        />
                        {searchPreview.length && searchQuery.length > 2
                            ? <div>
                                <div className={s.search_preview_cont}>

                                    {searchPreview.map(r => (
                                        <div className={s.search_rest} onClick={() => { handleRestaurantRedirect(r.id) }}>
                                            <img className={s.search_img} src={r.image} alt={r.name} />
                                            <span>{r.name}{r.plus ? <img style={{ 'width': '20px', 'height': '20px' }} src={foodifypluslogo} alt='plus' /> : <></>}</span>
                                        </div>))}

                                </div>
                            </div> : <></>}
                    </form>
                </div>
                <div className={s.categories_cont}>
                    {categories.map((c) => (
                        <div key={c.name}>
                            <div>
                                <div onClick={handleCategory} className={s.logo_cont}>
                                    <img className={s.logo_img} src={c.img} alt={c.name} />
                                </div>
                            </div>
                            <div className={s.name_cat_cont}>
                                <span className={s.name_cat}>{c.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {searchPreview.length && searchQuery.length > 2
                ? <div onClick={() => {setSearchQuery('') }} style={{ position: 'absolute', backgroundColor: 'black', opacity: .4, width: '100%', height: '100vh', zIndex: '998', top: 0, left: 0 }} />
                : <></>
            }
        </>
    )
}

export default SearchBar