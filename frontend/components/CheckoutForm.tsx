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
import ItemCard from "./shop-components/ItemCard";
import ItemCardList from "./shop-components/ItemCardList";
import {injectStripe} from "react-stripe-elements-universal";
import StripeBtn from "./StripeButton";
import getCartByUserId from "../lib/requestsEndpoints/getCartByUserId";
interface Props {
  form: any;
  theme: ITheme;
  stripe?: any;
}

const CheckoutForm: React.SFC<Props> = ({form, theme}) => {
  const {getFieldDecorator} = form;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [accessToken, setAccessToken] = useState();
  const [userId, setUserId] = useState();
  const CREDIT_CARD = "CREDIT_CARD";
  const GIFT_CARD = "GIFT_CARD";
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = Number(window.localStorage.getItem("userid"));

        const cartData = await getCartByUserId(userId);

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
    shippingMethodHandler(0);
    setAccessToken(window.localStorage.getItem("access_token"));
    setUserId(Number(window.localStorage.getItem("userid")));
  }, []);

  const paymentMethodHandler = (value: string) => {
    console.log(value);
    form.setFieldsValue({
      "payment-group": value,
    });
  };
  const shippingMethodHandler = (value: number) => {
    form.setFieldsValue({
      "shipping-group": value,
    });
  };

  const changeInputHandler = (e: InputEventTarget) => {
    setOrderInfo({...orderInfo, [e.target.name]: e.target.value});
  };
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Order Placement"
        headStyle={{background: theme.black, color: theme.white}}
      >
        <Form.Item>
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Review Cart - {formatMoney(totalPrice)}
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
                    imagePublicId={item.image}
                    imageHeight={50}
                    imageWidth={75}
                  />
                );
              })}
            </ItemCardList>
          </Drawer>
        </Form.Item>
        <Form.Item label="Shipping Method">
          {getFieldDecorator("shipping-group", {
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
                shippingMethodHandler(e.target.value);
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
          if (!accessToken) {
            return (
              <Button
                type="primary"
                onClick={() => {
                  Router.push("/auth");
                }}
              >
                Login to Start Payment
              </Button>
            );
          } else if (form.getFieldValue("payment-group") === CREDIT_CARD) {
            return (
              <Form.Item>
                {/* Stripe goes by cents 1000 would be 10 dollars, so I moved the decimal by 2 */}
                <StripeBtn
                  headerImg={""}
                  amount={totalPrice * 100}
                  userId={userId}
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
      </Card>
    </StyledAuthForm>
  );
};
const WrappedCheckoutForm = Form.create({name: "normal_checkout"})(
  CheckoutForm,
);
export default injectStripe(withTheme(WrappedCheckoutForm));
