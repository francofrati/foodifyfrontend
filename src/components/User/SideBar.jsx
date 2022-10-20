import s from './SideBar.module.scss'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import{BsCardChecklist , BsFillGiftFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../assets/userLogo.png'
import { useState } from 'react';
import { fetchUserById } from '../../Redux/thunks/userThunks';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode"





function SideBar(){

    const[image, setImage] = useState(userLogo)
    
    const { userById } = useSelector((state) => state.user);
    let info = jwt_decode(window.localStorage.token);
    
    let id = info.id
    let navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
  
        dispatch(fetchUserById(id));
       
        
      
  }, []);

    const handleClick = () => {
      navigate("/")
      window.location.reload()
      localStorage.clear()
      
  
    }

    return(
    <div className={s.main}>
       
        <div  className={s.container}>

            <ul>
           
            
                <li>
                    <Link to='/user'>User</Link>
                </li>
                
                {/* <li className={s.lista}>
                    <Link to="/user/myGiftCards">My GiftCards </Link>
                </li> */}
                
                <li> 
                    <Link to="/user/purchases">Purchases</Link>
                </li>
                
                {/* <li>
                    <Link to="/user/payment">Payment</Link>
                </li> */}
                <li>
                    <Link to={'/'} onClick={handleClick}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
    )
}
export default SideBar