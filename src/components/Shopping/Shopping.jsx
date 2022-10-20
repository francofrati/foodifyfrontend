import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } from '../../Redux/slices/shoppingSlice'
import styles from './Shopping.module.scss'
import './CartContainer.scss'
import PayButton from './PayButton.jsx'
import { fetchCreds, fetchUserById } from '../../Redux/thunks/userThunks'
import jwt_decode from 'jwt-decode'

const Shopping = () => {

    const { id } = useParams()


    
    const cart = useSelector((state) => state.shopping)
    const dispatch = useDispatch()
    let info = jwt_decode(window.localStorage.getItem('token'));
    // const { userById } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getTotals())
    }, [cart])

    const userById = useSelector((state) => state.user);


    useEffect(() =>{
      dispatch(getTotals())
      // dispatch(fetchUserById(info.id));
    }, [cart])

    const {user} = useSelector((state) => state.user)
    
    useEffect(() => {
      if(window.localStorage.getItem('token')){
        dispatch(fetchCreds(window.localStorage.getItem('token')))
      }

    }, [])



    const infoIdMongo = {
      idRestaurant: id
    }


    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    useEffect(() => {
      return() => localStorage.removeItem('cartItems')
    }, [])
    

    return(
        // <div>
        //       <div className={styles.titles}></div>
        //       <div className={styles.cartItems}>
        //         {cart.cartItems.map((cartItem) => (
        //           <div className={styles.cartItem} key={cartItem.id}>
        //             <div class="background-img">
        //               <img alt="background"
        //                 src={cartItem.image}
        //                 className="imagengames"
        //               />
        //               <div class="box">
        //                 <span></span>
        //                 <span></span>
        //                 <span></span>
        //                 <span></span>
        //                 <div class="content">
        //                   <h3>{cartItem.name}</h3>
        //                   <p>
        //                     <a>Rating: {cartItem.rating}</a>
        //                   </p>
        //                   <div className={styles.cartProductPrice}>
        //                     ${cartItem.price}
        //                   </div>

        //                   <button
        //                     type="button"
        //                     onClick={() => handleRemoveFromCart(cartItem)}
        //                   >
        //                     Remove
        //                   </button>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         ))}
        //       </div>

        //       <div className={styles.cartSummary}>
        //       <button className={styles.clearCart} onClick={() => handleClearCart()}>Clear cart</button>
        //         <div className={styles.cartCheckout}>
        //           <div className={styles.subtotal}>
        //             <span>Subtotal: {cart.cartTotalAmount}$</span>

        //             <span className={styles.amount}>$</span>
        //           </div>
        //           <p>Taxes and shipping calculated at checkout</p>
        //           {/* <PayButton cartItems={cart.cartItems} userInfo={userById} cartInfo={cart}/> */}
        //           <div className={styles.continueShopping}>
        //             <Link to="/">
        //               <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 width="20"
        //                 height="20"
        //                 fill="currentColor"
        //                 className="bi bi-arrow-left"
        //                 viewBox="0 0 16 16"
        //               >
        //                 <path
        //                   fillRule="evenodd"
        //                   d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        //                 />
        //               </svg>
        //               <span>Continue Shopping</span>
        //             </Link>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        <div >
        <div className={styles.cartContainer}>
        <div className={styles.container}>
          <h2>Shopping cart</h2>
          {cart.cartItems.length === 0 ? (
            <div className={styles.cartEmpty}>
              <p>Your shopping cart is currently empty</p>
              <div className={styles.startShopping}>
                <Link to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                class="bi bi-arrow-left" 
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                  <span>Start shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.titles}>
                <h3 className={styles.productTitle}>Product</h3>
                <h3 className={styles.price}>Price</h3>
                <h3 className={styles.quantity}>Quantity</h3>
                <h3 className={styles.total}>Total</h3>
              </div>
              <div className={styles.cartItems}>
                {cart.cartItems?.map(cartItem => (
                  <div className={styles.cartItem} key={cartItem.id}>
                    <div className={styles.cartProduct}>
                      <img src={cartItem.image} alt={cartItem.name}/>
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.description}</p>
                        <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                      </div>
                    </div>
                    <div className={styles.cartProductPrice}>${cartItem.price}</div>
                    <div className={styles.cartProductQuantity}>
                      <button className={styles.cartProductQuantityButton} onClick={() => handleDecreaseCart(cartItem)}>-</button>
                      <div className={styles.count}>{cartItem.cartQuantity}</div>
                      <button className={styles.cartProductQuantityButton} onClick={() => handleIncreaseCart(cartItem)}>+</button>
                    </div>
                    <div className={styles.cartProductTotalPrice}>
                      ${cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
              </div>
    
              <div className={styles.cartSummary}>
                <button className={styles.clearCart} onClick={() => handleClearCart()}>Clear cart</button>
                <div className={styles.cartCheckout}>
                  <div className={styles.subtotal}>
                    <span>Subtotal</span>
                    <span className={styles.amount}>${cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  {
                  user && <PayButton cartItems={cart.cartItems} userInfo={userById} cartInfo={cart} idRestaurant={id}/>
                    }
                  <div className={styles.continueShopping}>
                    <Link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                      </svg>
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
              
            </div>
            
            )}</div>
       {/* <Footer />      */}
        </div>
        
        </div>
    )
}

export default Shopping