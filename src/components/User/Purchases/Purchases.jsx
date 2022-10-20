import React from 'react';
import SideBar from '../SideBar.jsx';
import s from './Purchases.module.scss'
import Product from './Product';
import jwt_decode from "jwt-decode"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../../Redux/thunks/userThunks';
import { fetchAllFoods } from '../../../Redux/thunks/foodsThunks';

function Purchases(){

    const[review, setReview] = useState(false)    
    const { foods } = useSelector((state) => state.foods);
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user);
    const {userById} = useSelector((state) => state.user);


    let info = jwt_decode(window.localStorage.token);
    let id = info.id
    
    
    useEffect(() => {
  
        dispatch(fetchUserById(id));
        dispatch(fetchAllFoods());
        
        //setReload(false)
        
      
  }, []); 
    
    function editOn(){
        setReview(true)
      }
    const editOff = () =>{
        setReview(false)
    }
    
    let comidas

    if(userById.purchased_foods){
        let deletecopy = [...new Set(userById.purchased_foods)]
        console.log(deletecopy)
        
        comidas = deletecopy.map(comida => {
             //console.log(fiids)
            console.log(comida)
            let filtrado = foods.filter(b =>  b.id === comida)
            //console.log(filtrado)
            return filtrado
        })
        
    console.log("COMIDAS: " + comidas)
        
    }
    console.log("FOOD: " + foods)

    const rederProducts = () =>(

        <tbody>

            {
               comidas.map((arreglo) => {
                    return arreglo.map((food, i) =>(

                         <Product 
                        key={i}
                        i = {i}
                        foodName={food.title}
                        image={food.image}
                        price={food.price}
        
                        />
                    ))
               }) 
                
                
}
        </tbody>

    )

    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            
            {   

            comidas.length>0?(                
                <div className={s.containerPur}>
                <table className={s.table}>
                    <caption className={s.table_cap}>PURCHASES<div></div></caption>
                    <thead className={s.table_head}>
                        <tr className={s.table_row}>
                            <th className={s.table_heading} scope='col'>Food</th>
                            <th className={s.table_heading} scope='col'>Name</th>
                            <th className={s.table_heading} scope='col'>Price</th>
                        </tr>
                    </thead>
                    {rederProducts()}
                </table>
                
                </div>):
                <div className={s.vacio}>
                    <div>
                     <h1>Not purchases  yet</h1>
                    </div>
                    <div>
                        <h1>Buy now!!!</h1>
                    </div>
                    <div>
                        <Link to={'/'}>
                            <button >BUY</button> 
                        </Link>
                    </div>
                </div>
             }

        </div>
    )
}
export default Purchases