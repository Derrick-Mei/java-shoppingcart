import styled from "styled-components";
import CheckoutForm from "../components/CheckoutForm";
import {useState, useEffect, useContext} from "react";
import {StripeProvider, Elements} from "react-stripe-elements-universal";
import Context from "../components/context/Context";
const CheckoutPage = () => {
  const {publicRuntimeConfig} = useContext(Context);
  return (
    <StripeProvider apiKey={publicRuntimeConfig.STRIPE_PUBLISH_KEY}>
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
