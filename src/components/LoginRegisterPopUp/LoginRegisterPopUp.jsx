import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'

const LoginRegisterPopUp = () => {

    const [toggle, setToggle] = useState(true)

    const onClick = ()=>{
        setToggle(prevState=>!prevState)
    }

    return (
        <AnimatePresence>
            {toggle
                ? <Login key={'login'}toggle={onClick}/>
                : <Register key={'register'}toggle={onClick}/>
            }
        </AnimatePresence>

    )
}

export default LoginRegisterPopUp