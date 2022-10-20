import axios from 'axios'
import { getOrders } from '../slices/ordersSlice'

const fetchAllOrders = () => (dispatch) => {
    axios
      .get("/orders")
      .then((response) => {
        dispatch(getOrders(response.data));
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  };

// const ordersEdit = (dispatch) => {
//   let config ={headers:{authorization:localStorage.getItem("token")}}
//   axios
//     .put("/orders/:id", config)
//     .then((response) => {
//       dispatch
//     })
// }

  export { 
    fetchAllOrders
   };