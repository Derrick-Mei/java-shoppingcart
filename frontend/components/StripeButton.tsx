import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export interface Props {
  headerImg: string;
  amount: number;
}

const StripeBtn: React.SFC<Props> = ({headerImg, amount}) => {
  const publishableKey = "pk_test_fbmMQVyluBRGwx3QN5yo0Bi8";

  const onToken = (token: any) => {
    const body = {
      amount: amount,
      token: token,
    };
    console.log(token);
    // axios
    //     .post("http://localhost:8000/payment", body)
    //     .then(response => {
    //       console.log(response);
    //       alert("Payment Success");
    //     })
    //     .catch(error => {
    //       console.log("Payment Error: ", error);
    //       alert("Payment Error");
    //     });
    //TODO: Add a request to the server to finish payment
    //Send a receipt to customer's email if they have one

    //POST to server address information for next time
    // Router.push({
    //   pathname: "/order-completed",
    // });
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
