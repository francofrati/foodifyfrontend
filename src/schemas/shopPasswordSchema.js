import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const shopPasswordSchema = yup.object().shape({
    actualPassword: yup
        .string()
        .min(6, 'La contraseña debe ser de 6 o mas caracteres')
        .required('Requerido'),
    newPassword: yup
        .string()
        .min(6, 'La contraseña debe ser de 6 o mas caracteres')
        .matches(passwordRules, 'Debe contener una minuscula, una mayuscula y un numero')
        .required('Requerido'),
    checkNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], "Las contraseñas deben coincidir")
        .required("Requerido")
})

export default shopPasswordSchema