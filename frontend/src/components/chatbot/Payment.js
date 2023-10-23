import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Fetch the client secret from your server when the component mounts
    axios
      .post("/create-payment-intent", { amount: 1000, currency: "USD" })
      .then((res) => res)
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
      // Payment succeeded
      console.log("Payment successful:", paymentMethod);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "30px 30px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
