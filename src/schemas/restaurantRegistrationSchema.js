import * as yup from "yup";


const phoneNumberRules = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const nameRules = /^[a-zA-Z\s]*$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const restaurantRegistrationSchema = yup.object().shape({
    email: yup.string().email("Email invalido").required("Requerido"),
    name: yup
        .string()
        .min(3)
        .matches(nameRules, 'Solo se pueden usar letras')
        .required('Requerido'),
    owner_name: yup
        .string()
        .min(3)
        .matches(nameRules, 'Solo se pueden usar letras')
        .required('Requerido'),
    country: yup
        .string()
        .min(3)
        .matches(nameRules, 'Solo se pueden usar letras')
        .required('Requerido'),
    state: yup
        .string()
        .min(3)
        .matches(nameRules, 'Solo se pueden usar letras')
        .required('Requerido'),
    city: yup
        .string()
        .min(3)
        .matches(nameRules, 'Solo se pueden usar letras')
        .required('Requerido'),
    phone: yup
        .string()
        .min(4)
        .matches(phoneNumberRules, 'Numero invalido')
        .required('Requerido')
});

export const restaurantRegistrationSchemaStepTwo = yup.object().shape({
    brandLogo: yup
        .string()
        .required('Requerido'),
    password: yup
        .string()
        .min(6, 'La contraseña debe ser de 6 o mas caracteres')
        .matches(passwordRules, 'Debe contener una minuscula, una mayuscula y un numero')
        .required('Requerido'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
        .required("Required"),
})