export const userByIdURL = (id) => `https://foodifyback.herokuapp.com/user/verify/${id}`
export const verifyRestaurantByIdURL = (id) => `https://foodifyback.herokuapp.com/restaurant/verify/${id}`
export const loginURL = 'https://foodifyback.herokuapp.com/user/login'
export const credsURL = 'https://foodifyback.herokuapp.com/authentication'
export const signUpURL = 'https://foodifyback.herokuapp.com/user/signup'
export const allRestaurantsURL = 'https://foodifyback.herokuapp.com/restaurant'
export const oneRestaurantURL = (id) => `https://foodifyback.herokuapp.com/restaurant/${id}`
export const loginRestaurantURL = 'https://foodifyback.herokuapp.com/restaurant/login'
export const registerRestaurantURL = 'https://foodifyback.herokuapp.com/restaurant/register'
export const googleAuthURL = 'https://foodifyback.herokuapp.com/user/google'
export const accountVerificationURL = 'https://foodifyback.herokuapp.com/user/verify'
export const restaurantVerificationURL = 'https://foodifyback.herokuapp.com/restaurant/verify'
export const preVerifyRestaurantRegistrationURL = 'https://foodifyback.herokuapp.com/restaurant/register/verify'
export const getOrdersByRestId = (id) => `https://foodifyback.herokuapp.com/orders/ordenes?restId=${id}`
export const shopPanelURL = (option) => `https://foodifyback.herokuapp.com/shop?option=${option}`
export const shopPasswordChangeURL = `https://foodifyback.herokuapp.com/shop/password`
export const getAllFoodURL = `https://foodifyback.herokuapp.com/foods`
export const getOrdersByUserIdURL = (userId) =>`https://foodifyback.herokuapp.com/orders/${userId}`
export const addFavoriteRestaurantURL = `https://foodifyback.herokuapp.com/user/favorite`
export const getFavoritesRestaurantsURL = (userId)=>`https://foodifyback.herokuapp.com/user/favorite/${userId}`
export const getFoodByRestaurantURL = (restId)=>`https://foodifyback.herokuapp.com/foods/foodsRestaurant/${restId}`
export const foodUpdateRestaurant = `https://foodifyback.herokuapp.com/shop/food`
export const getShopInfoURL = (restId) =>`https://foodifyback.herokuapp.com/shop/${restId}`
export const reviewURL = `https://foodifyback.herokuapp.com/reviews`
export const reviewRestURL = (restId)=> `https://foodifyback.herokuapp.com/reviews/restaurant?restId=${restId}`
export const reviewUserURL = (userId)=> `https://foodifyback.herokuapp.com/reviews/user?userId=${userId}`
//janfkjas
