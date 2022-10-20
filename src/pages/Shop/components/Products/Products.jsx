import React, { useEffect, useState } from 'react'

import { FiEdit2 } from 'react-icons/fi'

import s from './Products.module.css'

import CreateFood from '../../../../components/RestaurantComponents/CreateFood/CreateFood'
import axios from 'axios'
import { foodUpdateRestaurant, getAllFoodURL, getFoodByRestaurantURL } from '../../../../assets/endpoints'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import swal from 'sweetalert'



const CustomInput = ({ data, field, db, foodId, setWhenUpdate }) => {

  const [editField, setEditField] = useState(false)

  const valueInp = useRef()

  const handleView = () => {
    setEditField(prevState => (!prevState))
  }

  const handleChange = (value) => {
    const body = {
      foodId: foodId,
      attributes: {
        [db]: value
      }
    }

    axios.post(foodUpdateRestaurant, body)
      .then(r => {
        if (r.data.status) {
          swal({ title: 'Se actualizo correctamente', icon: 'success' })
            .then(re => {
              setWhenUpdate()
              handleView()
            })
        }
      })

  }

  return (
    <div style={{ textAlign: 'left', width: '25%', fontWeight: 'bold', fontSize: '1.3rem' }}>{field}:
      {editField
        ? <div className={s.edit_btn}>
          <input ref={valueInp} placeholder={data} />
          <button onClick={handleView}>Cancelar</button>
          <button onClick={() => handleChange(valueInp.current.value)}>Editar</button>
        </div>
        : <div className={s.edit_btn}>
          <span>{data}</span>
          <button style={{ backgroundColor: 'transparent', border: 0 }} onClick={handleView}><FiEdit2 cursor={'pointer'} color={'#20B5E5'} size='1.4rem' /></button>
        </div>
      }
    </div>
  )
}

const ProductCard = ({ productName, productDescription, productPrice, timesSold, productImage, foodId, setWhenUpdate }) => {

  const [edit, setEdit] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={s.row_cont} >
        <div className={s.row_name}>{productName}</div>
        <div className={s.row_desc}>{productDescription && productDescription.substr(0, 40)}</div>
        <div className={s.row_price}>${productPrice}</div>
        {/* <div className={s.row_times}>{timesSold}</div> */}
        <div className={s.row_img}>
          <img src={productImage} alt={productName} style={{ width: '70px', height: '70px', borderRadius: 4 }} />
        </div>
        <div style={{ width: '5%' }} onClick={() => setEdit(prevState => !prevState)}>
          <FiEdit2 cursor={'pointer'} color={'#20B5E5'} size='1.4rem' />
        </div>
      </div>
      {edit && <div className={s.row_edit_cont}>
        <CustomInput foodId={foodId} setWhenUpdate={setWhenUpdate} data={productName} field='Nombre' db='title' />
        <CustomInput foodId={foodId} setWhenUpdate={setWhenUpdate} data={productPrice} field='Precio' db='price' />
        <CustomInput foodId={foodId} setWhenUpdate={setWhenUpdate} data={productDescription} field='Descripcion' db='description' />
        <CustomInput foodId={foodId} setWhenUpdate={setWhenUpdate} data={productImage} field='Imagen' db='image' />

      </div>}
    </div>
  )
}

const ProductsCont = () => {

  const [products, setProducts] = useState([])

  const params = useParams()
  const { id } = params

  const setProductsWhenFoodUpdate = () => {
    axios.get(getFoodByRestaurantURL(id))
      .then(r => {
        setProducts(r.data.foods)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    axios.get(getFoodByRestaurantURL(id))
      .then(r => {
        setProducts(r.data.foods)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      {products.length && products.map((p, i) => (
        <ProductCard
          key={i}
          foodId={p.id}
          productName={p.title}
          productDescription={p.description}
          productPrice={p.price}
          productImage={p.image}
          setWhenUpdate={setProductsWhenFoodUpdate}
        />
      ))}
    </>
  )
}



const Products = ({ restId }) => {


  return (
    <div className={s.cont}>
      <div className={s.form}>
        <CreateFood restId={restId} />
      </div>
      <h1 style={{color:'#20B5E5'}}>Productos</h1>
      <div className={s.products_cont}>
        <ProductsCont />
      </div>
    </div>
  )
}

export default Products