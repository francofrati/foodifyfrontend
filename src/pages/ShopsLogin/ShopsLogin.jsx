import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Formik, Form } from 'formik'

import CustomInput from '../../components/LoginRegister/CustomInput'

import s from './ShopsLogin.module.css'
import axios from 'axios'
import { loginRestaurantURL } from '../../assets/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreds } from '../../Redux/thunks/userThunks'
import { FiLock } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import foodify_logo from '../../assets/foodify_logo.png'
import {loginSchema} from '../../schemas/loginSchema'



const ShopsLogin = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)

    const [error, setError] = useState(null)

    const handleLogin = (values) => {

        axios.post(loginRestaurantURL, values)
            .then((r) => {
                const { status, token } = r.data
                if (status) {
                    window.localStorage.setItem('token', token)
                    dispatch(fetchCreds(token))
                    console.log(user)
                }
            })
            .catch(e => {
                setError(e.response.data.msg)
            })
    }

    useEffect(() => {
        if (user && user.type === 'restaurant') {
            navigate(`/negocios/${user.id}`)
        }
    }, [user, navigate])

    return (
        <div className={s.cont} >
            <Link to={'/restaurantes'}>
            <img className={s.foody_logo} src={foodify_logo} alt={'foodify'} />
            </Link>
            <div className={s.left_cont}>
                <div className={s.register_cont}>
                    <h1>Aumenta tus ventas</h1>
                    <h1>Hacele llegar tu comida a mas gente todavia</h1>
                    <h1>Solo por una suscripcion mensual</h1>
                    <Link className={s.btn_register}to={'/negocios/registro'}>
                        <div style={{backgroundColor:'#20B5E5',borderRadius:10,height:30,fontWeight:'bold',color:'white',textDecoration:'none',outline:'none'}}>

                        Registrate
                        </div>
                    </Link>
                </div>
            </div>
            <div className={s.rigth_cont}>
                <h1>Ya sos parte?</h1>
                <h1>Inicia Sesion</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={handleLogin}
                    validationSchema={loginSchema}
                >
                    <Form className={s.login_form}>
                        <CustomInput
                            placeholder='Email'
                            name='email'
                            type='text'
                            icon={<MdOutlineEmail />}
                        />
                        <CustomInput
                            placeholder='Password'
                            name='password'
                            type='password'
                            icon={<FiLock />}
                        />
                        <p>{error}</p>
                        <button type='submit'>Iniciar Sesion</button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default ShopsLogin