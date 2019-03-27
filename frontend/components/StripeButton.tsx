import StripeCheckout from "react-stripe-checkout";
import {createBearerAxios} from "../lib/axiosInstances";
import {notification} from "antd";
import postCreateOrder from "../lib/requestsEndpoints/postCreateOrder";
import Router from "next/router";

export interface Props {
  headerImg: string;
  amount: number;
  userId: number;
}

const StripeBtn: React.SFC<Props> = ({headerImg, amount, userId}) => {
  const publishableKey = "pk_test_fbmMQVyluBRGwx3QN5yo0Bi8";

  const onToken = (token: any) => {
    // console.log(token);
    const authAxios = createBearerAxios();

    authAxios({
      method: "post",
      url: "/charge",
      data: {
        amount: amount,
        stripeEmail: token.email,
        stripeToken: token.id,
      },
    })
      .then(async ({data}: any) => {
        // console.log(data);
        if (data.status === "succeeded") {
          notification.success({
            message: "Stripe has processed payment!",
          });

          const saveUserDetailsSuccessCb = notification.success.bind(
            null,
            {
              message: "Your information has been saved to our database.",
            },
          );
          const saveUserDetailsFailureCb = notification.error.bind(null, {
            message:
              "Your information has failed to be saved in our database.",
          });
          const {address} = data.billingDetails;
          const {line1, city, state, postalCode} = address;
          const shipAddress = `${line1}, ${city} ${state} ${postalCode}`;
          const orderData = await postCreateOrder(
            {
              shippingaddress: shipAddress,
              paymentdetails: "credit card",
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
      })
      .catch((err: any) => {
        console.log(err);
      });
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
