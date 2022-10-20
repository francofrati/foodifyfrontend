import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from 'formik';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import { registrationSchema } from '../../schemas/registrationSchema';
import { loginSchema } from '../../schemas/loginSchema';
import CustomInput from './CustomInput';
import { fetchCreds } from '../../Redux/thunks/userThunks';
import { fetchCredsRest } from '../../Redux/thunks/restaurantsThunks';
import { loginRestaurantURL, signUpURL } from '../../assets/endpoints';

import s from './login.module.css'

//LOS ESTILOS HAY QUE CAMBIARLOS, NO DEJARLOS INLINE.



export const RestaurantLogin = () => {

    const dispatch = useDispatch()
    const { userRest } = useSelector(state => state.restaurants)
    console.log(window.localStorage.getItem('token'))
    useAuth()



    const navigate = useNavigate()
    useEffect(() => {
        console.log(userRest)
    }, [userRest])

    useEffect(() => {
        if (userRest) {
            navigate(`/restaurantes/${userRest.id}`)
        }
    }, [userRest, navigate])

    const onSubmit = async (values) => {

        try {
            const call = await axios.post(loginRestaurantURL, values)

            const { token } = call.data

            window.localStorage.setItem('token', token)

            dispatch(fetchCredsRest(window.localStorage.getItem('token')))

            navigate(`/restaurantes/${userRest.id}`)
        } catch (error) {
            alert(error.response.data.Error)
            console.log(error)
        }

    }

    return (
        <div style={{ 'padding': '3rem' }}>
            <div className={s.glass}>
                <h1 style={{ 'color': 'white' }}>Inicia sesion</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={loginSchema}
                >
                    {(props) => (
                        <Form>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '3rem' }}>

                                <CustomInput
                                    name='email'
                                    label='Email:'
                                    type='text'
                                    placeholder='foodify@foodify.com'
                                />
                                <CustomInput
                                    name='password'
                                    label='Password:'
                                    type='password'
                                    placeholder='Foodify%123'
                                />
                                <button type='submit'>Log In</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}



export const RegisterRestaurant = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/restaurantes')
        }
    }, [user, navigate])


    const onSubmit = async (values) => {
        try {
            const call = await axios.post(signUpURL, values)

            const { token } = call.data

            window.localStorage.setItem('token', token)

            dispatch(fetchCreds(window.localStorage.getItem('token')))

            navigate('/restaurantes')
        } catch (error) {
            alert(error.response.data.Error)
            console.log(error)
        }
    }

    return (
        <div style={{ 'padding': '3rem' }}>
            <div className={s.glass}>
                <h1 style={{ 'color': 'white' }}>Registra tu negocio:</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                        image: '',
                        country: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchema}
                >
                    {(props) => (
                        <Form>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '3rem' }}>

                                <CustomInput
                                    name='name'
                                    label='Nombre completo:'
                                    type='text'
                                    placeholder='Food Foodify'
                                />
                                <CustomInput
                                    name='email'
                                    label='Email:'
                                    type='text'
                                    placeholder='foodify@foodify.com'
                                />
                                <CustomInput
                                    name='image'
                                    label='Elegi la imagen de tu negocio:'
                                    type='text'
                                    placeholder='https://foodi.png'
                                />
                                <CustomInput
                                    name='country'
                                    label='Pais:'
                                    type='text'
                                    placeholder='Pais'
                                />
                                <CustomInput
                                    name='password'
                                    label='Password:'
                                    type='password'
                                    placeholder='Foodify%123'
                                />
                                <CustomInput
                                    name='confirmPassword'
                                    label='Password:'
                                    type='password'
                                    placeholder='Foodi1'
                                />
                                <button type='submit'>Registrarse</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

