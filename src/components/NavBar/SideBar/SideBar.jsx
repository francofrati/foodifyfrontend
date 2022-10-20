import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import s from './SideBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillTriangleFill } from 'react-icons/bs'
import {BiDownArrow} from 'react-icons/bi'
import { getUserCreds } from '../../../Redux/slices/userSlice'
import OrdersSideBar from '../../OrdersSideBar/OrdersSideBar'
import FavoritesSideBar from '../../favoritesSideBar/FavoritesSideBar'


const CustomOptions = ({ name, path, onClick }) => {

    const [ordersVisible, setOrdersVisible] = useState(false)

    const toggleOrders = () => {
        setOrdersVisible(prevState => !prevState)
    }
    return (
        <>
            <div className={name === 'Cerrar sesion' ? s.btn_option_contClose : s.btn_option_cont} onClick={onclick} >
                <Link style={{ outline: 'none', textDecoration: 'none', color: 'white' }} to={path}>
                    <span onClick={toggleOrders}>{name} </span>
                </Link>
                {name === 'Pedidos' && ordersVisible &&
                    <OrdersSideBar toggle={toggleOrders} />
                }
                {
                    name==='Mis Favoritos'&& ordersVisible && <FavoritesSideBar toggle={toggleOrders}/>
                }
                <span className={ordersVisible?s.order_arrow_active: s.order_arrow}> {name==='Pedidos'&&<BsFillTriangleFill size={'.8rem'}/>}{name==='Mis Favoritos'&&<BsFillTriangleFill size={'.8rem'}/>}</span>
            </div>
        </>
    )
}

const SideBar = ({ isVisible, setIsVisible }) => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOutBtn = () => {
        window.localStorage.removeItem('token')
        dispatch(getUserCreds(null))
        navigate('/')
    }

    return (

        <AnimatePresence>
            {isVisible && <>
                <motion.div
                    className={s.cont}
                    initial={{ left: -600, }}
                    animate={{ left: 0, top: 0 }}
                    exit={{ left: -600, }}
                    transition={{ duration: .5, delay: .2 ,ease:'easeInOut'}}

                >
                    <div className={s.hide_bar} onClick={setIsVisible}>
                        <motion.div
                            exit={{ right: 400 }}
                            transition={{ duration: .2 }}
                            className={s.icon_span}>
                            <BsFillTriangleFill />
                        </motion.div>
                    </div>
                    <div className={s.user_info_cont}>
                        <img className={s.avatar} src="https://www.clarin.com/img/2022/08/02/AS5MR89xx_720x0__1.jpg" alt="avatar" />
                        <div className={s.user_name}>
                            <span>
                                {user && user.name}
                            </span>
                            <span>
                                {user && user.email}
                            </span>
                        </div>
                    </div>
                    <div className={s.option_cont}>
                        {user && <div className={s.sections}>
                            <CustomOptions name='Pedidos' />
                            <CustomOptions name='Mis Favoritos' />
                            <CustomOptions name='Metodos de pago' />

                        </div>}
                        <div className={s.sections}>
                            <CustomOptions name='Registra tu Negocio' path={'/negocios'} />
                            <CustomOptions name='Foodify +' />

                        </div>
                        {user && <div className={s.sections}>
                            <CustomOptions name='Cuenta' />
                            <CustomOptions onClick={() => { handleLogOutBtn(); setIsVisible() }} style={{ backgroundColor: '#B65151' }} name='Cerrar sesion' />
                        </div>
                        }
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: .4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .5, delay: .2 }}

                    onClick={setIsVisible}
                    style={{ position: 'fixed', backgroundColor: 'black', opacity: .4, width: '100%', height: '100vh', zIndex: '1000', top: 0, left: 0 }} />
            </>}
        </AnimatePresence>

    )
}


export default SideBar