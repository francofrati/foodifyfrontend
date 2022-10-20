import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { getOrdersByRestId } from '../../../../assets/endpoints'

import s from './Orders.module.css'



const Order = ({ name, img, status, user_name, address, handleStatus, id, price }) => {

  console.log(id)
  return (
    <div>
      {/* <div className={s.img_cont}>
        <img className={s.img} src={img} alt={name} />
      </div> */}
      <div className={s.info_cont}>
        <div className={s.products_cont}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#187797' }}>Productos:</div>
          <div className={s.products_info_cont}>{name.map((p, i) => <span className={s.boldText + ' ' + s.group} key={i}>{p.title} <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#187797' }}>Cant:</span>{p.cartQuantity}</span>)}</div>

        </div>
        <div className={s.desc}>
          Para: <span className={s.boldText}>{user_name}</span>
        </div>
        <div className={s.desc}>
          Direccion:<span className={s.boldText}>{address}</span>
        </div>
        <div className={s.desc}>
          Precio:<span className={s.boldText}>${price}</span>
        </div>
        <div className={s.desc}>
          Estado:<span className={s.boldText}>{status}</span>
        </div>
        <div className={s.btn_cont}>
          {status === 'proceso'
            ? <>
              <button className={s.btn_status} onClick={() => handleStatus(id, 'delivered')}>Finalizar</button>
              <button className={s.btn_status} onClick={() => handleStatus(id, 'pending')}>Pendiente</button>
            </>
            : <></>
          }
          {status === 'delivered'
            ? <button className={s.btn_status} onClick={() => handleStatus(id, 'errorProceso')}>En proceso</button>
            : <></>
          }
          {status === 'pending'
            ? <button className={s.btn_status} onClick={() => handleStatus(id, 'proceso')}>En proceso</button>
            : <></>
          }

        </div>
      </div>
    </div>
  )
}

const Orders = () => {

  const [pendingOrders, setPendingOrders] = useState([])

  const [inProccessOrders, setInProccessOrders] = useState([])

  const [finishedOrders, setFinishedOrders] = useState([])



  const handleStatusChange = (orderId, status) => {

    if (status === 'delivered') {
      swal({
        title: 'Estas seguro que ya esta listo el pedido?',
        icon: 'warning',
        buttons: true
      })
        .then(value => {
          if (value) {
            axios.post(`https://server-om6g.onrender.com/shop?option=status`, { delivery_status: status, orderId: orderId })
              .then(r => {

                if (r.data.status) {
                  swal({
                    title: 'Orden finalizada',
                    icon: 'success'
                  }).then(re => {
                    setFinishedOrders(r.data.orders)
                    axios.get(`https://server-om6g.onrender.com/orders/ordenes?deliveryStatus=proceso`).then(r => setInProccessOrders(r.data.orders))
                  })
                }
                return
              })
          }
        })
    }

    axios.post(`https://server-om6g.onrender.com/shop?option=status`, { delivery_status: status, orderId: orderId })
      .then((r) => {
        if (status === 'proceso') {
          if (r.data.status) {
            setInProccessOrders(r.data.orders)
            // setPendingOrders((o)=>o.filter(o=>o.id!==orderId))
            axios.get(`https://server-om6g.onrender.com/orders/ordenes?deliveryStatus=pending`).then(r => setPendingOrders(r.data.orders))
          }
          return
        }
        if (status === 'pending') {
          if (r.data.status) {
            setPendingOrders(r.data.orders)
            axios.get(`https://server-om6g.onrender.com/orders/ordenes?deliveryStatus=proceso`).then(r => setInProccessOrders(r.data.orders))
          }
          return
        }
        if (status === 'errorProceso') {
          if (r.data.status) {
            setInProccessOrders(r.data.orders)
            axios.get(`https://server-om6g.onrender.com/orders/ordenes?deliveryStatus=delivered`).then(r => setFinishedOrders(r.data.orders))
          }
          return
        }
      })
  }

  const params = useParams()

  const { id } = params

  // useEffect(() => {
  //   axios.get(getOrdersByRestId(id))
  //     .then(r => {
  //       setOrders(r.data)
  //     })
  //     .catch(e => console.log(e))
  // }, [])

  useEffect(() => {
    axios.get(`https://server-om6g.onrender.com/shop/orders?delivery_status=pending&restId=${id}`).then(r => setPendingOrders(r.data.orders))
    axios.get(`https://server-om6g.onrender.com/shop/orders?delivery_status=proceso&restId=${id}`).then(r => setInProccessOrders(r.data.orders))
    axios.get(`https://server-om6g.onrender.com/shop/orders?delivery_status=delivered&restId=${id}`).then(r => setFinishedOrders(r.data.orders))
  }, [])

  return (
    <div className={s.cont}>
      <div className={s.state_column}>
        <div className={s.state}>Pendientes</div>
        <div className={s.orders_cont}>
          {pendingOrders.length
            ? pendingOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1} price={o.total_price} />)
            : <></>
          }
        </div>
      </div>
      <div className={s.state_column}>
        <div className={s.state}>En proceso</div>
        <div className={s.orders_cont}>
          {inProccessOrders.length
            ? inProccessOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1} price={o.total_price} />)
            : <></>
          }
        </div>
      </div>
      <div className={s.state_column}>
        <div className={s.state}>Finalizados</div>
        <div className={s.orders_cont}>
          {finishedOrders.length
            ? finishedOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1} price={o.total_price} />)
            : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Orders