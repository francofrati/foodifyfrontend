import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import axios from "axios"
import { BiUser } from 'react-icons/bi'
import { FiLock } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { BsFacebook, BsGoogle } from 'react-icons/bs'



import { fetchCreds } from "../../Redux/thunks/userThunks"
import CustomInput from "../../components/LoginRegister/CustomInput"

import { registrationSchema } from "../../schemas/registrationSchema"

import { googleAuthURL, signUpURL } from "../../assets/endpoints"

import s from './Register.module.css'
import useAuth from "../../hooks/useAuth"
import { loginWithGoogle } from "../../firebase/authHelpers"

const Register = ({toggle}) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    useAuth()

    useEffect(() => {
        if (user) {
            navigate('/restaurantes')
        }
    }, [user, navigate])

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
        <div className={s.cont}>
            <div className={s.glass}>
                <div className={s.title}>Registrate</div>
                <div style={{ fontSize: '1rem' }}>Continuar con:</div>

                <div className={s.btn_container}>
                    <button className={s.btn_google} style={{ backgroundColor: '#fb4343' }} onClick={googleLogin}><BsGoogle />GOOGLE</button>
                    <button className={s.btn_google} style={{ backgroundColor: '#3b5998' }}><BsFacebook />FACEBOOK</button>
                </div>
                <div style={{ fontSize: '1rem' }}>o</div>

                <Formik
                    style={{ width: '80%' }}
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                    }}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchema}
                >
                    {(props) => (
                        <Form style={{ width: '100%' }}>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '3rem', alignItems: 'center' }}>

                                <CustomInput
                                    name='name'
                                    type='text'
                                    placeholder='Nombre Completo'
                                    icon={<BiUser />}
                                />
                                <CustomInput
                                    name='email'
                                    type='text'
                                    placeholder='Email'
                                    icon={<MdOutlineEmail />}
                                />
                                <CustomInput
                                    name='password'
                                    type='password'
                                    placeholder='Contraseña'
                                    icon={<FiLock />}
                                />
                                <button className={s.btn_google} style={{backgroundColor:'#20B5E5'}} type='submit'>Registrarse</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div><span>Ya tenes cuenta?  </span><span style={{color:'#20B5E5',fontWeight:'bold',cursor:'pointer'}} onClick={toggle}>Inicia Sesion</span></div>
                <div><span style={{fontWeight:'bold'}}>Al registrarte estas aceptando nuestros  </span><span style={{color:'#20B5E5',fontWeight:'bold'}}>condiciones y politicas de privacidad</span></div>

            </div>
        </div>
    )
}

export default Register