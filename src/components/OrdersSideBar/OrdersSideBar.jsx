import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { BsCheckLg } from 'react-icons/bs'

import { getOrdersByUserIdURL } from '../../assets/endpoints'

import s from './OrdersSideBar.module.css'


const Order = ({ shopName, status }) => {
    return (
        <div className={s.order_cont}>
            <div>{shopName}</div>
            <div>
                {status === 'pending'
                    ? <div className={s.dots_cont}>
                        <div className={s.status_dot} />
                        <div className={s.status_dot2} />
                        <div className={s.status_dot3} />
                    </div>
                    : <div className={s.dots_cont}><BsCheckLg color='green' /></div>
                }
            </div>
        </div>
    )
}

const OrdersSideBar = ({ toggle }) => {

    const [orders, setOrders] = useState([])

    const[loading,setLoading] = useState(true)

    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        axios.get(getOrdersByUserIdURL(user.id))
            .then(({ data }) => {
                if (data.status) setOrders(data.orders)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    if(loading)return <></>
else{

    return (
        <>
            {orders.length
                ? <div className={s.orders_cont}>
                    {(orders.map((o, i) => (
                        <Order
                            shopName={o.user_email}
                            status={o.delivery_status}
                        />))
                    )}
                    <button onClick={toggle}>Ir a Mis pedidos</button>

                </div>
                : <></>
            }
        </>
    )
}
}

export default OrdersSideBar