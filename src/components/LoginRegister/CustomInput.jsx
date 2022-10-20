import React from 'react'
import { useField } from 'formik'

import s from './CustomInput.module.css'

const CustomInput = ({ label,icon, ...props }) => {

    const [field, meta, helpers] = useField(props)

    return (
        <div className={s.cont}>
            {/* <label>{label}</label> */}
            {}
            {icon?icon:<></>}
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ? `${s.inp} ${s.error}` : s.inp}
            />
            {meta.touched && meta.error && <p className={s.error_text}>{meta.error}</p>}
        </div>
    )
}

export default CustomInput