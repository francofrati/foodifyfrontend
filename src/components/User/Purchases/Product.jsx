import React from 'react';
import s from './Purchases.module.scss'

function Product({i, foodName, image, price}){
    return(
        
            <tr className={s.table_row}>
               
                <td className={s.table_cell}>
                    {image && <img className={s.producto} src={image} alt='imagen'/>}
                </td>
                <td className={s.table_cell}>{foodName}</td>
                <td className={s.table_cell}>${price}</td>
            </tr>
        
    )
}

export default Product