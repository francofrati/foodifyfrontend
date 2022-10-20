import React,{ useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import s from './Modal.module.css'
import { useSelector } from 'react-redux'

const Modal = ({ children, active, toggle, id }) => {

const {user} = useSelector(state=>state.user)


  if (active) {
    return (
      <AnimatePresence>
        {active && <motion.div
          key={id}
          className={s.fullpage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={s.content_div}>
            {children}
          </div>
          <div className={s.bg} onClick={toggle} />
        </motion.div>}
      </AnimatePresence>

    )
  } else {
    return <></>
  }
}


export default Modal