import axios from "axios";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";
import { clearCart } from "../../Redux/slices/shoppingSlice";

const PayButton = ({ cartItems, userInfo, cartInfo, idRestaurant }) => {

    let navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const token = window.localStorage.getItem('token')


    useEffect(() => {
        const token1 = window.localStorage.getItem('token')
    }, [])


    const idUsr = JSON.parse(JSON.stringify(user.id))
    const userrr = {
      user_id_mongo: idUsr,
      restaurant_id_mongo: idRestaurant
    }

    console.log(userrr)
    const handleCheckout = () => {
        
          console.log(userInfo);
          if (token) {
            axios
              .post(`https://server-om6g.onrender.com/payment/create-checkout-session`, {
                cartItems,
                userId: userrr,
              })
              .then((res) => {
                if (res.data.url) {
                  window.location.href = res.data.url;
                }
              })
              .catch((err) => console.log(err.message));
          } else {
            navigate("/login");
            // toast.error(`First you must be login`, {position: "top-center"})
          }
        }
    //   };


    return(
        <div>
            <button onClick={() => handleCheckout()}>Check out</button>
        </div>
    )

}

export default PayButton