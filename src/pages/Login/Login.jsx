import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import { MdOutlineEmail } from 'react-icons/md'
import { BsFacebook, BsGoogle } from 'react-icons/bs'
import { FiLock } from 'react-icons/fi'
import axios from "axios"

import useAuth from "../../hooks/useAuth"
import { fetchCreds } from "../../Redux/thunks/userThunks"
import CustomInput from "../../components/LoginRegister/CustomInput"

import { loginSchema } from "../../schemas/loginSchema"

import { googleAuthURL, loginURL } from "../../assets/endpoints"

import s from './login.module.css'
import { loginWithGoogle } from "../../firebase/authHelpers"

const Login = ({ toggle }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    console.log(window.localStorage.getItem('token'))
    useAuth()

    const navigate = useNavigate()

    const googleLogin = async() => {
        try {
            const googleLoginResult = await loginWithGoogle()

            const getTokenFromBackend = await axios.post(googleAuthURL,googleLoginResult)

            const {token} = getTokenFromBackend.data

            window.localStorage.setItem('token', token)

            dispatch(fetchCreds(window.localStorage.getItem('token')))

            navigate('/restaurantes')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        if (user) {
            navigate('/restaurantes')
        }
    }, [user, navigate])

    const onSubmit = async (values) => {

        try {
            const call = await axios.post(loginURL, values)

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
                <div className={s.title}>Iniciar sesión</div>
                <h5 style={{ fontSize: '1rem' }}>Continuar con:</h5>
                <div className={s.btn_container}>
                    <button className={s.btn_google} style={{ backgroundColor: '#fb4343' }} onClick={googleLogin}><BsGoogle />GOOGLE</button>
                    <button className={s.btn_google} style={{ backgroundColor: '#3b5998' }} onClick={(e)=>console.log(e.target)}><BsFacebook />FACEBOOK</button>
                </div>
                <h5 style={{ fontSize: '1rem' }}>o</h5>
                <Formik
                    style={{ width: '80%' }}
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={loginSchema}
                >
                    {(props) => (
                        <Form style={{ width: '100%' }}>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '1.5rem', 'alignItems': 'center', 'width': '100%' }}>

                                <CustomInput
                                    name='email'
                                    label='Email:'
                                    type='text'
                                    placeholder='Email'
                                    icon={<MdOutlineEmail />}
                                />
                                <CustomInput
                                    name='password'
                                    label='Password:'
                                    type='password'
                                    placeholder='Contraseña'
                                    icon={<FiLock />}
                                />
                                <div className={s.pass_for}>Olvidaste tu contraseña?</div>
                                <button className={s.btn_google} style={{ backgroundColor: '#20B5E5' }} type='submit'>Iniciar sesión con Email</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div><span>Todavia no tenes cuenta?  </span><span style={{ color: '#20B5E5', fontWeight: 'bold', cursor: 'pointer' }} onClick={toggle}>Registrate</span></div>
            </div>
        </div>
    )
}

export default Login