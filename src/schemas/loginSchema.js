import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email invalido").required("Requerido"),
    password: yup
        .string()
        .min(6, 'La contraseña debe ser de 6 o mas caracteres')
        .matches(passwordRules, 'Debe contener una minuscula, una mayuscula y un numero')
        .required('Requerido')
})