import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import swal from 'sweetalert'

import { BsPlusLg } from 'react-icons/bs'
import { fetchAllFoods, fetchAllDiets } from "../../../Redux/thunks/foodsThunks";

import style from './CreateFood.module.css'


const CreateFood = ({ restId }) => {
    const [send, setSend] = useState(false);
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const { diets } = useSelector((state) => state.foods)

    // useEffect(() => {
    //     if (diets.length === 0) {
    //         dispatch(fetchAllDiets())
    //     }
    // }, [dispatch, diets])

    const params = useParams()
    const { id } = params


    return (
        <div className={style.container}>
            <h1 style={{ color: '#20B5E5' }}>Agregar Productos</h1>
            {diets ?
                <div className={style.formulario}>

                    <Formik
                        initialValues={{
                            title: "",
                            image: "",
                            price: '',
                            //diets: '',Ver si eliminar
                            used: false,
                            description: ''
                        }}
                        validate={(values) => {
                            let errors = {};
                            //validacion nombre del plato  
                            if (!values.title) {
                                errors.title = 'Requerido'
                            } else if (values.title.length < 3 || values.title.length > 40) {
                                errors.title = 'Debe ser de 3 a 40 caracteres'
                            }

                            //validacion dietas
                            // if(!values.diets){
                            //     errors.diets = 'Please select the diet of the food'
                            // }else if(values.diets === 'Diet'){
                            //     errors.diets = 'Please select the diet of the food'
                            // }



                            //validacion imagen
                            if (!values.image) {
                                errors.image = 'Debes elegir una imagen'
                            }

                            //validacion precio  
                            if (!values.price) {
                                errors.price = 'Requerido'
                            } else if (values.price < 0) {
                                errors.price = 'El precio debe ser mayor a cero'
                            }


                            return errors;
                        }}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            console.log(values.file)

                            // console.log(imgC)
                            // console.log(values.file)

                            if (values.used === 'true') {
                                values.used = true
                            } else if (values.used === 'false') {
                                values.used = false
                            }
                            resetForm();
                            const body = {
                                food: values,
                                idRestaurant: restId
                            }

                            axios.post(`https://server-om6g.onrender.com/foods/`, body)
                                .then(r => {
                                    
                                        swal({
                                            title: 'Se agrego tu producto',
                                            // text:'Food added successfully',
                                            icon: 'success',
                                            button: 'OK'
                                        })

                                    
                                })                                
                                .then(res => {
                                    if (res) {
                                        dispatch(fetchAllFoods());
                                        // navigate('/')
                                    }
                                    
                                })

                            resetForm();
                            // setSend(true)
                            // setTimeout(() => setSend(false), 3000)
                            console.log(values)



                        }}
                    >
                        {({ errors, setFieldValue, values }) => (
                            <Form className={style.form}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 50, width: '50%', gap: 20 }}>




                                    <div>
                                        <label htmlFor="title">Elegi el nombre de tu producto: </label>
                                        <Field
                                            type='text'
                                            id="title"
                                            placeholder="Producto..."
                                            name="title"
                                        />
                                        <ErrorMessage name="title" component={() => (
                                            <div className={style.error}>{errors.title}</div>
                                        )} />
                                    </div>
                                    <div>
                                        <label htmlFor="prc">Precio: </label>
                                        <Field
                                            type="number"
                                            id="prc"
                                            placeholder="$9.50"
                                            name="price"
                                        />
                                        <ErrorMessage name="price" component={() => (
                                            <div className={style.error}>{errors.price}</div>
                                        )} />
                                    </div>


                                    <div className={style.desc_cont}>
                                        <label htmlFor="description">Descripcion del producto: </label>
                                        <Field
                                            as='textarea'
                                            id="description"
                                            placeholder="Producto..."
                                            name="description"
                                        />
                                        <ErrorMessage name="description" component={() => (
                                            <div className={style.error}>{errors.description}</div>
                                        )} />
                                    </div>

                                    {/* <div>
                                        <label htmlFor="diet">Diet: </label>
                                        <Field id="diets" name="diets" as='select' className={style.select}>
                                        <option value='Diet' selected> Diet </option>
                                        {
                                            diets.map(diet => {
                                                return (
                                                    <option value={diet}>{diet}</option>
                                                    )
                                                })
                                            }
                                            </Field>
                                            <ErrorMessage name="diets" component={() => (
                                                <div className={style.error}>{errors.diets}</div>
                                                )} />
                                            </div> */}


                                    <div>
                                        <label htmlFor="img">Image: </label>
                                        <>
                                            <Field
                                                type="file"
                                                id="image"
                                                value=""
                                                name="image"
                                                // onChange ={(event) => setFieldValue("file", event.target.files[0])}
                                                onChange={(event) => {
                                                    const formData = new FormData()
                                                    // console.log(event)
                                                    // console.log(event.target.files[0])
                                                    formData.append("file", event.target.files[0])
                                                    formData.append("upload_preset", "op9ii2j6")
                                                    //console.log(formData)
                                                    axios.post("https://api.cloudinary.com/v1_1/dlx7k9tef/image/upload", formData)
                                                        .then((response) => {
                                                            setFieldValue("image", response.data.url)
                                                            // console.log(response)
                                                            // console.log(response.data.url)
                                                        })

                                                }}
                                            />
                                            <ErrorMessage name="image" component={() => (
                                                <div className={style.error}>{errors.image}</div>
                                            )} />
                                        </>

                                    </div>


                                </div>

                                <div className={style.img_cont}>
                                    <img src={values.image} alt="food" className={style.preview_img} />
                                </div>


                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                    <button style={{ height: '80%', width: '20%' }} type="submit">  <BsPlusLg size={'80%'} color={'#20B5E5'} /> </button>
                                    {send && <p>Producto agragado existosamente</p>}
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div> :
                <div>
                    <h1>Cargando</h1>
                </div>
            }
        </div>
    )

}


export default CreateFood