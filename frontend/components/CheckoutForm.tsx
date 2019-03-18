import {StyledAuthForm} from "./styles/StyledAuthForm";
import {Form, Radio, Button, Icon, Input, Card, Drawer} from "antd";
import {withTheme} from "styled-components";
import {useState, useEffect} from "react";
import uuidv4 from "uuid/v4";
import Router from "next/router";
import {
  Theme as ITheme,
  InputEventTarget,
  CartItem as ICartItem,
} from "../interfaces/index";
import {formatMoney} from "../lib/formatMoney";
import {createBearerAxios} from "../lib/axiosInstances";
import ItemCard from "./shop-components/ItemCard";
import ItemCardList from "./shop-components/ItemCardList";
import {injectStripe, CardElement} from "react-stripe-elements-universal";

interface Props {
  form: any;
  theme: ITheme;
  stripe: object;
}

interface CheckoutValues {
  shippingAddress: string;
  billingAddress: string;
  shipMethod: string;
  payMethod: string;
  payMethodNumber: string;
}
interface StripeCreditObject {
  brand: string;
  complete: boolean;
  elementType: string;
  empty: boolean;
  error: undefined;
  value: {postalCode: string};
}
const CheckoutForm: React.SFC<Props> = ({form, theme, stripe}) => {
  const {getFieldDecorator} = form;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    shippingAddress: "",
    billingAddress: "",
    shipMethod: "",
    payMethod: "",
    payMethodNumber: "",
  });
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [credit, setCredit] = useState();
  const CREDIT_CARD = "CREDIT_CARD";
  const GIFT_CARD = "GIFT_CARD";
  useEffect(() => {
    //TODO: get all cart items for the user
    //so that they can review their cart and have the total price of all products
    const fetchCartItems = async () => {
      try {
        const {data: cartData} = await createBearerAxios()({
          method: "get",
          url: `/cart/${window.localStorage.getItem("userid")}`,
        });

        const items = [];
        let totalPriceInCart = 0;
        for (let i = 0; i < cartData.length; i++) {
          const quantity = cartData[i].quantityincart;
          totalPriceInCart +=
            cartData[i].price * cartData[i].quantityincart;
          for (let j = 0; j < quantity; j++) {
            const newItem = {
              ...cartData[i],
              keyId: uuidv4(),
            };
            items.push(newItem);
          }
        }
        setTotalCartPrice(totalPriceInCart);
        setTotalPrice(totalPriceInCart);
        //@ts-ignore
        setCartItems(items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
    paymentMethodHandler(CREDIT_CARD);
  }, []);

  const paymentMethodHandler = (value: string) => {
    console.log(value);
    form.setFieldsValue({
      "payment-group": value,
    });
  };

  const changeInputHandler = (e: InputEventTarget) => {
    setOrderInfo({...orderInfo, [e.target.name]: e.target.value});
  };

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    form.validateFields((err: object, values: CheckoutValues) => {
      stripe.createToken(credit).then(obj => {
        console.log("Received Stripe token:", obj);
      });
      if (err) {
        console.log("Received values of form: ", values);
      }

      // Router.push({
      //   pathname: "/order-completed",
      // });
    });
  }

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Order Placement"
        headStyle={{background: theme.black, color: theme.white}}
      >
        <Form.Item>
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Review Cart
          </Button>
          <Drawer
            title="Items In Cart"
            placement="left"
            closable={true}
            onClose={() => setDrawerOpen(false)}
            visible={isDrawerOpen}
          >
            <Button
              type="primary"
              onClick={() =>
                Router.push({
                  pathname: "/shop",
                })
              }
              style={{marginBottom: "20px"}}
            >
              Back To Shop
            </Button>
            <ItemCardList>
              {cartItems.map((item: ICartItem) => {
                return (
                  <ItemCard
                    key={item.keyId}
                    title={item.productname}
                    description={formatMoney(item.price)}
                    image={item.image}
                  />
                );
              })}
            </ItemCardList>
          </Drawer>
        </Form.Item>
        <Form.Item label="Shipping Address">
          {getFieldDecorator("shipping", {
            rules: [
              {
                required: true,
                message: "Please input a shipping address!",
              },
            ],
          })(
            <Input
              prefix={
                <Icon type="home" style={{color: "rgba(0,0,0,.25)"}} />
              }
              placeholder="Enter Shipping Address"
              name="shippingAddress"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
        <Form.Item label="Billing Address">
          {getFieldDecorator("billing", {
            rules: [
              {
                required: false,
                message: "Please input a billing address!",
              },
            ],
          })(
            <Input
              prefix={
                <Icon type="home" style={{color: "rgba(0,0,0,.25)"}} />
              }
              placeholder="Enter Billing Address - Not Required"
              name="billingAddress"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>

        <Form.Item label="Shipping Method">
          {getFieldDecorator("radio-group", {
            rules: [
              {
                required: true,
                message: "Please choose a shipping method",
              },
            ],
          })(
            <Radio.Group
              name="shipMethod"
              onChange={(e: {target: {value: number}}) => {
                setTotalPrice(totalCartPrice + e.target.value);
              }}
            >
              <Radio value={12.99}>1 Day Shipping - $12.99</Radio>
              <Radio value={5.99}>3 Day Shipping - $5.99</Radio>
              <Radio value={0}>1 Week Shipping - Free</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="Payment Method">
          {getFieldDecorator("payment-group", {
            rules: [
              {
                required: true,
                message: "Please choose a credit card or gift card",
              },
            ],
          })(
            <Radio.Group
              name="payMethod"
              onChange={(e: {target: {value: string}}) => {
                paymentMethodHandler(e.target.value);
              }}
            >
              <Radio value={CREDIT_CARD}>Credit Card</Radio>
              <Radio value={GIFT_CARD} disabled={true}>
                Gift Card - Coming Soon
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        {(() => {
          if (form.getFieldValue("payment-group") === CREDIT_CARD) {
            return (
              <Form.Item label="Add Credit Card Number">
                <CardElement
                  onChange={(creditObj: StripeCreditObject) => {
                    setCredit(creditObj);
                  }}
                />
              </Form.Item>
            );
          } else if (form.getFieldValue("payment-group") === GIFT_CARD) {
            return (
              <Form.Item label="Add Gift Card Number">
                {getFieldDecorator("number", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your gift card number.",
                      pattern: /\d+/,
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon
                        type="home"
                        style={{color: "rgba(0,0,0,.25)"}}
                      />
                    }
                    placeholder="Enter Gift card number"
                    name="payMethodNumber"
                    onChange={changeInputHandler}
                  />,
                )}
              </Form.Item>
            );
          }
        })()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order - {formatMoney(totalPrice)}
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};
const WrappedCheckoutForm = Form.create({name: "normal_checkout"})(
  CheckoutForm,
);

export default injectStripe(withTheme(WrappedCheckoutForm));
