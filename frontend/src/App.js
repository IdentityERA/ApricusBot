import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chatbot from "./components/chatbot/Chatbot";
import Header from "./components/shop/Header";
import PaymentForm from "./components/chatbot/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_API_KEY}`);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          exact
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
