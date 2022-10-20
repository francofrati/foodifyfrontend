import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

const CheckoutForm = () => {

    const stripePromise = loadStripe("pk_test_51LpmzKDr4Wz2hsEOQs66404wDC78KzaxZ73QrUimBmOwQ94dsT0NKOIzjadUrNouRh4rfMBbNmjJiu6FdN9v2LDH004QuJZdqV")

    const [loading, setLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        setLoading(true);
    
      };
    
    return (
        <Elements stripe={stripePromise}>
            <form> <CardElement/> </form>
        </Elements>
    )
}

export default CheckoutForm