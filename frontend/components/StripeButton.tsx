import StripeCheckout from "react-stripe-checkout";
import {createBearerAxios, createBaseAxios} from "../lib/axiosInstances";
export interface Props {
  headerImg: string;
  amount: number;
}

const StripeBtn: React.SFC<Props> = ({headerImg, amount}) => {
  const publishableKey = "pk_test_fbmMQVyluBRGwx3QN5yo0Bi8";

  const onToken = (token: any) => {
    // console.log(token);
    createBearerAxios()({
      method: "post",
      url: "/charge",
      data: {
        amount: amount,
        stripeEmail: token.email,
        stripeToken: token.id,
      },
    })
      .then(({data}: any) => {
        console.log(data);
        //POST to server address information for next time
        //Send a receipt to customer's email if they have one

        // Router.push({
        //   pathname: "/order-completed",
        // });
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
