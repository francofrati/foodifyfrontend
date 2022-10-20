export const userByIdURL = (id) => `https://server-om6g.onrender.com/user/verify/${id}`
export const verifyRestaurantByIdURL = (id) => `https://server-om6g.onrender.com/restaurant/verify/${id}`
export const loginURL = 'https://server-om6g.onrender.com/user/login'
export const credsURL = 'https://server-om6g.onrender.com/authentication'
export const signUpURL = 'https://server-om6g.onrender.com/user/signup'
export const allRestaurantsURL = 'https://server-om6g.onrender.com/restaurant'
export const oneRestaurantURL = (id) => `https://server-om6g.onrender.com/restaurant/${id}`
export const loginRestaurantURL = 'https://server-om6g.onrender.com/restaurant/login'
export const registerRestaurantURL = 'https://server-om6g.onrender.com/restaurant/register'
export const googleAuthURL = 'https://server-om6g.onrender.com/user/google'
export const accountVerificationURL = 'https://server-om6g.onrender.com/user/verify'
export const restaurantVerificationURL = 'https://server-om6g.onrender.com/restaurant/verify'
export const preVerifyRestaurantRegistrationURL = 'https://server-om6g.onrender.com/restaurant/register/verify'
export const getOrdersByRestId = (id) => `https://server-om6g.onrender.com/orders/ordenes?restId=${id}`
export const shopPanelURL = (option) => `https://server-om6g.onrender.com/shop?option=${option}`
export const shopPasswordChangeURL = `https://server-om6g.onrender.com/shop/password`
export const getAllFoodURL = `https://server-om6g.onrender.com/foods`
export const getOrdersByUserIdURL = (userId) =>`https://server-om6g.onrender.com/orders/${userId}`
export const addFavoriteRestaurantURL = `https://server-om6g.onrender.com/user/favorite`
export const getFavoritesRestaurantsURL = (userId)=>`https://server-om6g.onrender.com/user/favorite/${userId}`
export const getFoodByRestaurantURL = (restId)=>`https://server-om6g.onrender.com/foods/foodsRestaurant/${restId}`
export const foodUpdateRestaurant = `https://server-om6g.onrender.com/shop/food`
export const getShopInfoURL = (restId) =>`https://server-om6g.onrender.com/shop/${restId}`
export const reviewURL = `https://server-om6g.onrender.com/reviews`
export const reviewRestURL = (restId)=> `https://server-om6g.onrender.com/reviews/restaurant?restId=${restId}`
export const reviewUserURL = (userId)=> `https://server-om6g.onrender.com/reviews/user?userId=${userId}`
