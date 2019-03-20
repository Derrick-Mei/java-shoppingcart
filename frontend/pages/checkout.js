import styled from "styled-components";
import CheckoutForm from "../components/CheckoutForm";
import {useState, useEffect} from "react";
import {StripeProvider, Elements} from "react-stripe-elements-universal";
const CheckoutPage = () => {
  return (
    <StripeProvider apiKey={process.env.STRIPE_PUBLISH_KEY}>
      <Elements>
        <CheckoutWrapper>
          <CheckoutForm />
        </CheckoutWrapper>
      </Elements>
    </StripeProvider>
  );
};

const CheckoutWrapper = styled.div``;
export default CheckoutPage;
