import StripeCheckout from "react-stripe-checkout";
import {notification} from "antd";
import {
  postCreateOrder,
  postStripeCharge,
} from "../lib/requestsEndpoints/index";
import Router from "next/router";

interface Props {
  headerImg: string;
  amount: number;
}
interface StripeToken {
  email: string;
  id: string;
}
const StripeBtn: React.SFC<Props> = ({headerImg, amount}) => {
  const publishableKey = "pk_test_fbmMQVyluBRGwx3QN5yo0Bi8";

  const onToken = async (token: StripeToken) => {
    // console.log({token});
    const stripeData = await postStripeCharge(
      amount,
      token.email,
      token.id,
    );

    console.log({stripeData});
    if (stripeData.status === "succeeded") {
      notification.success({
        message: "Stripe has processed payment!",
      });

      const saveUserDetailsSuccessCb = notification.success.bind(null, {
        message: "Your information has been saved to our database.",
      });
      const saveUserDetailsFailureCb = notification.error.bind(null, {
        message:
          "Your information has failed to be saved in our database.",
      });
      const {address} = stripeData.billingDetails;
      const {line1, city, state, postalCode} = address;
      const shipAddress = `${line1}, ${city} ${state} ${postalCode}`;
      await postCreateOrder(
        {
          shippingAddress: {
            addressId: 3,
          },
          billingAddress: {
            addressId: 3,
          },
          paymentDetails: "credit card",
        },
        saveUserDetailsSuccessCb,
        saveUserDetailsFailureCb,
      );
      Router.push({
        pathname: "/order-completed",
      });
    } else {
      notification.error("The payment process has failed");
    }
  };
  return (
    <StripeCheckout
      label="Start Payment Process" //Component button text
      name="Mean Coffee Bean" //Modal Header
      description="Finish your order."
      panelLabel="Submit Order" //Submit button in modal
      amount={amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image={headerImg} //Pop-in header image
      billingAddress={true}
      shippingAddress={true}
      allowRememberMe={true}
    />
  );
};

export default StripeBtn;
