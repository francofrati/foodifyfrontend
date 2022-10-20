import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchCreds } from '../../Redux/thunks/userThunks'
import s from './Shop.module.css'

import foodify_logo from '../../assets/foodify_logo.png'
import Orders from './components/Orders/Orders'
import Products from './components/Products/Products'
import Account from './components/Account/Account'
import { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { getUserCreds } from '../../Redux/slices/userSlice'
import Reviews from './components/Reviews/Reviews'

const optionsConfig = [
    { name: 'Pedidos' },
    { name: 'Productos' },
    { name: 'Ventas' },
    { name: 'Opiniones' },
    { name: 'Cuenta' },
]

const Options = ({ name, changeOption, active }) => {

    return (
        <div onClick={changeOption} className={active === name ? `${s.option_cont} ${s.active_option}` : s.option_cont}>
            {name}
        </div>
    )
}


const Shop = () => {

    const { user } = useSelector(state => state.user)

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            dispatch(fetchCreds(token))
        }
    }, [])




    const handleOptions = (state) => {
        switch (state) {
            case 'Pedidos':
                return <Orders />
            case 'Cuenta':
                return <Account name={user && user.name} />
            case 'Productos':
                return <Products restId={user && user.id} />
            case 'Opiniones':
                return <Reviews />
            default:
                return <></>
        }
    }

    const [option, setOption] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(option)
    }, [option])

    useEffect(() => {
        if (user && user.type !== 'restaurant') {
            navigate('/')
        }
        if (!user) {
            navigate('/')
        }

    }, [user])

    const logOut = () => {
        window.localStorage.removeItem('token')
        dispatch(getUserCreds(null))
        navigate('/negocios')
    }
    console.log(user)

    return (
        <>
            {user && (
                <div className={s.cont}>
                    <div className={s.panel_cont}>
                        <div className={s.foody_cont}>
                            <img className={s.foodify_logo} src={foodify_logo} alt="foodify" />

                        </div>
                        <div className={s.options_cont}>
                            {optionsConfig.map(e => <Options active={option} changeOption={() => setOption(e.name)} name={e.name} key={e.name} />)}
                            <button onClick={logOut}><BiLogOut size={'5rem'} /></button>
                        </div>
                    </div>
                    <div className={s.content_cont}>
                        <div className={s.shop_name_cont}>
                            <img src={user.image} className={s.foodify_logo} alt={s.name} />
                            {user.name}

                        </div>
                        <div className={s.options_info_cont}>
                            {handleOptions(option)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default Shop