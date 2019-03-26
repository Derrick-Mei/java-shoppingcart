import StripeCheckout from "react-stripe-checkout";
import {createBearerAxios, createBaseAxios} from "../lib/axiosInstances";
import {notification} from "antd";
export interface Props {
  headerImg: string;
  amount: number;
}

const StripeBtn: React.SFC<Props> = ({headerImg, amount}) => {
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
      .then(({data}: any) => {
        console.log(data);
        if (data.status === "succeeded") {
          authAxios({
            method: "post",
            url: `/cart/buy/${window.localStorage.getItem("userid")}`,
            data: {
              shippingaddress: "string address1",
              paymentdetails: "Mastercard1",
              user: {
                userid: window.localStorage.getItem("userid"),
              },
              orderproducts: [
                {
                  productid: 2,
                },
                {
                  productid: 2,
                },
                {
                  productid: 4,
                },
                {
                  productid: 1,
                },
              ],
            },
          })
            .then(({data}: any) => {
              console.log("POST /buy ", data);
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          notification.error("The payment process has failed");
        }

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
