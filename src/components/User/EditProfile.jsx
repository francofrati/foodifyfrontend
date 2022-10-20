import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from "react-router-dom";
import style from './EditProfile.module.scss'
import jwt_decode from "jwt-decode"
import swal from 'sweetalert'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserById
} from "../../Redux/thunks/userThunks";
// import { BallTriangle } from "react-loader-spinner";

function EditProfile({ editProdileOff, reloading, data, infoUser }) {

    const { userById } = useSelector((state) => state.user);
    const [send, setSend] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: userById.name, email: userById.email })
    let info = jwt_decode(window.localStorage.token);

    let id = info.id

    const dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        if (!userById.name) {
            dispatch(fetchUserById(id));

        }

    }, [dispatch, userById]);





    return (
        <div>
            <div className={style.mainContainer}>
                <Formik
                    initialValues={{
                        name: infoUser.name,
                        email: infoUser.email,


                    }}
                    validate={(values) => {
                        let errors = {};
                        //validacion nombre    
                        if (!values.name) {
                            errors.name = 'Please write your name'
                        } else if (values.name.length < 4 || values.name.length > 40) {
                            errors.name = 'Name must have between 4 or 20 characters'
                        }
                        // //validacion nombre del password   
                        // if(!values.password ){
                        //     errors.password = 'Please write your password'
                        // }else if(values.password.length ===  0){
                        //     errors.password = 'Please write your password'
                        // }
                        // //validacion nombre del password2   
                        // if(!values.password2){
                        //     errors.password2 = 'Please write your password'
                        // }else if(values.password2 !== values.password){
                        //     errors.password2 = 'Passwords do not match'
                        // }

                        //validacion correo
                        if (!values.email) {
                            errors.email = 'Please write the e-mail address'
                        } else if (!/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/.test(values.email)) {
                            errors.email = 'Write a correct e-mail address'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)

                        swal({
                            title: 'Update Personal Info?',
                            icon: "warning",
                            buttons: ['Cancel', 'Confirm']
                        }).then(res => {
                            if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda


                                axios({
                                    method: 'put',
                                    url: `/user/${id}`,
                                    data: {
                                        name: values.name,
                                        email: values.email,
                                    }

                                })
                                    .then(data({
                                        name: values.name,
                                        email: values.email,
                                    }))
                                    .catch(e => console.log(e))
                                // navigate(`/user`)
                                //dispatch(fetchUserById(id))
                                //navigate("/user", { replace: true })

                            }
                        })
                        editProdileOff()
                        reloading()
                        resetForm();
                        setSend(true)


                    }}
                >
                    {({ errors }) => (
                        <Form className={style.form}>
                            <h2>Personal Information</h2>
                            <div>
                                <label htmlFor="name">Full Name: </label>
                                <Field
                                    type='text'
                                    id="name"
                                    placeholder="Type a name..."
                                    name="name"
                                />
                                <ErrorMessage name="name" component={() => (
                                    <div className={style.error}>{errors.name}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="name">E-mail: </label>
                                <Field
                                    type='email'
                                    id="email"
                                    placeholder="example@example.com"
                                    name="email"
                                />
                                <ErrorMessage name="email" component={() => (
                                    <div className={style.error}>{errors.email}</div>
                                )} />
                            </div>

                            <div>
                                <button type="submit" className={style.buttonSave}>  Save </button>
                                <button onClick={() => editProdileOff()} className={style.buttonCancel}>  Back </button>
                                {send && <p>Information updated succecsfully</p>}

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default EditProfile;