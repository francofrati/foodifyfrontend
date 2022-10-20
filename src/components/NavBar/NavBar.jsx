import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TiThMenu } from 'react-icons/ti'
import { MdLocationOn } from 'react-icons/md'

import Modal from '../Modal/Modal'
import LoginRegisterPopUp from '../LoginRegisterPopUp/LoginRegisterPopUp'
import { fetchCreds } from '../../Redux/thunks/userThunks'
import useAuth from '../../hooks/useAuth'
import SideBar from './SideBar/SideBar'

import foodify_logo from '../../assets/foodify_logo.png'

import s from './NavBar.module.css'


const NavBar = () => {

  const path = window.location.pathname

  
  const navigate = useNavigate()
  
  const [lnlt, setLnlt] = useState(null)
  
  const [location, setLocation] = useState(null)
  
  useAuth()
  
  const dispatch = useDispatch()
  
  const { user } = useSelector(state => state.user)
  
  //ACOMODAR Y REFACCIONAR ESTO-------------
  
  useEffect(() => {
    if (lnlt) {
      axios.get(`http://api.positionstack.com/v1/reverse?access_key=4a9dc4f7e168903b6d3612fd4f67dffe&query=${lnlt.lt},${lnlt.ln}`)
      .then(r => setLocation(`${r.data.data[0].region}, ${r.data.data[0].country}`))
    }
  }, [lnlt])
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((l) => {
      setLnlt({
        lt: l.coords.latitude,
        ln: l.coords.longitude
      })
    },
    (e) => {
      console.log(e)
    })
  }, [])
  
  //----------------

  
  const [activeLogin, setActiveLogin] = useState(false)
  
  const toggleLogin = ()=>{
    setActiveLogin(prevState=>!prevState)
  }
  
  useEffect(()=>{
    if(user){
      setActiveLogin(false)
    }
  },[user])
  
  useEffect(()=>{
    if(activeLogin){
      document.body.style.overflow='hidden'
    }
    if(!activeLogin){
      document.body.style.overflow='unset'
    }
  },[activeLogin])
  
  const [isVisible, setIsVisible]=useState(false)
  
  if(path.includes('negocios') || path.includes('verify') || window.location.pathname.includes('admin')){
    return <></>
  }else{
    return (
      <div >
        <SideBar isVisible={isVisible} setIsVisible={()=>{setIsVisible(state=>!state)}}/>
      <div className={s.cont}>
        <div className={s.menu_logo_cont}>
          <div onClick={()=>{setIsVisible(state=>!state)}}><TiThMenu style={{ 'color': '#20B5E5', 'fontSize': '1.7rem', 'paddingTop': '5px' }} /></div>
          <div>
            <img className={s.logo} onClick={() => navigate('restaurantes')} src={foodify_logo} alt={'foodify'} />
          </div>
        </div>
        <div>
          <div className={s.ubication_cont}>
            <MdLocationOn style={{ 'color': '#B65151', 'fontSize': '1.9rem' }} /><span>{location ? location : 'Ubicacion'}</span>
          </div>
        </div>
        <div>
          <div style={{ 'display': 'flex' }}>
            <div></div>
            <div></div>
            <div>
              <img className={s.avatar} src={'https://www.clarin.com/img/2022/08/02/AS5MR89xx_720x0__1.jpg'} alt={'foodify'} />
            </div>
            {user ? <button className={s.btn_session} onClick={() => {
              window.localStorage.removeItem('token')
              dispatch(fetchCreds(window.localStorage.getItem('token')))
              navigate('/')
            }}>Cerrar Sesion</button> : <>
              <button className={s.btn_session} onClick={() => {setActiveLogin(state=>!state)}}>Empezar</button>
            </>}
  
          </div>
        </div>
      </div>
      <div style={{'position':'absolute','top':0,'left':0,'width':'100%'}}>
        <Modal active={activeLogin} toggle={toggleLogin} id='modal'>
          <LoginRegisterPopUp />
        </Modal>
      </div>
      </div>
    )
  }
}

export default NavBar