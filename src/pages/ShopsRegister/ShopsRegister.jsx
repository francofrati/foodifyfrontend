import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { Form, Formik } from "formik"

import s from './ShopsRegister.module.css'

import CustomInput from './CustomInput/CustomInput'
import { preVerifyRestaurantRegistrationURL, registerRestaurantURL } from '../../assets/endpoints'
import { useState } from 'react'
import { restaurantRegistrationSchema, restaurantRegistrationSchemaStepTwo } from '../../schemas/restaurantRegistrationSchema'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { getUserCreds } from '../../Redux/slices/userSlice'



const FirstStep = ({ changeForm, globalValue }) => {

  const handleSubmit = async (values) => {
    const body = {
      name: values.name,
      email: values.email,
      country: values.country,
      state: values.state,
      city: values.city,
      owner_name: values.owner_name,
      phone: values.phone
    }
    axios.post(preVerifyRestaurantRegistrationURL, body)
      .then((r) => {
        if (r.data.status) {
          globalValue(body)
          changeForm();
        }
      })
      .catch((e) => {
        console.log(e)
        alert('Chequear error en consola')
      })
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>

      <Formik
        initialValues={{
          country: '',
          state: '',
          city: '',
          name: '',
          owner_name: '',
          email: '',
          phone: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={restaurantRegistrationSchema}
      >
        <Form
          className={s.form_one_cont}
        >
          <div style={{ fontSize: '2rem' }}>
            Registra tu tienda en <span style={{ color: '#20B5E5', fontWeight: 'bold' }}>Foodify</span>
            <div style={{ fontSize: '1rem' }}>Completa los siguientes campos para empezar a vender</div>
          </div>
          <div className={s.first_cont}>

            <div className={s.location_cont}>
              <CustomInput
                name='country'
                placeholder='Pais'
                type='text'
              />
              <CustomInput
                name='state'
                placeholder='Estado o Provincia'
                type='text'
              />
              <CustomInput
                name='city'
                placeholder='Ciudad'
                type='text'
              />

            </div>
            <div className={s.info_cont}>

              <CustomInput
                name='name'
                placeholder='Nombre de la Tienda'
                type='text'
              />
              <CustomInput
                name='owner_name'
                placeholder='Nombre Completo'
                type='text'
              />
            </div>
          </div>
          <CustomInput
            name='email'
            placeholder='Email'
            type='text'
          />
          <CustomInput
            name='phone'
            placeholder='Numero de telefono'
            type='text'
          />
          <button className={s.btn_submit} type='submit'>Siguiente</button>
          <div><span style={{ fontWeight: 'bold' }}>Al registrarte estas aceptando nuestras  </span><span style={{ color: '#20B5E5', fontWeight: 'bold' }}>condiciones y politicas de privacidad</span></div>
        </Form>
      </Formik>
    </motion.div>
  )
}



const SecondStep = ({ globalValue, prevValues }) => {

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    const body = {
      password: values.password,
      image: values.brandLogo,
      email: prevValues.email
    }

    axios.post(registerRestaurantURL, body)
      .then((r) => {
        if (r.data.status) {
          
          navigate(r.data.path)
        }
      })
  }

  return (

    <Formik
      initialValues={{
        brandLogo: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={restaurantRegistrationSchemaStepTwo}
    >
      <Form className={s.form_one_cont}>
        <div style={{ fontSize: '2rem' }}>
          Registra tu tienda en <span style={{ color: '#20B5E5', fontWeight: 'bold' }}>Foodify</span>
          <div style={{ fontSize: '1rem' }}>Nos falta el logo de tienda y que elijas tu contraseña</div>
        </div>
        <CustomInput
          name='brandLogo'
          placeholder='Logo de tu negocio'
          type='text'
        />
        <CustomInput
          name='password'
          placeholder='Contraseña'
          type='password'
        />
        <CustomInput
          name='confirmPassword'
          placeholder='Confirmar contraseña'
          type='password'
        />
        <button className={s.btn_submit} type='submit'>Registrarse</button>
      </Form>
    </Formik>

  )
}


const ShopsRegister = () => {

  const [step, setStep] = useState(1)

  const [bothFormValues, setBothFormValues] = useState({})

  const handleValues = (values) => {
    setBothFormValues(prevState => ({
      ...prevState,
      ...values
    }))
  }

  const changeForm = () => {
    setStep(2)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      window.localStorage.removeItem('token')
      dispatch(getUserCreds(null))
    }
  })

  return (
    <div
      className={s.cont}
    >
      <div className={s.progress_cont}>
        <div className={s.progress}></div>
        <div className={step === 1 ? s.progress1 : s.progress} ></div>
      </div>
      <AnimatePresence>
        {step === 1 && <FirstStep changeForm={changeForm} globalValue={handleValues} />}
        {step === 2 && <SecondStep globalValue={handleValues} prevValues={bothFormValues} />}

      </AnimatePresence>
    </div>
  )
}

export default ShopsRegister