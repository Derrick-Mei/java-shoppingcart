import { StyledAuthForm } from "./styles/StyledAuthForm";
import { Form, Radio, Button, Icon, Input, Card } from "antd";
import styled, { withTheme } from "styled-components";
import { useState, useEffect } from "react";
import Router from "next/router";

const CheckoutForm = ({ form, theme }) => {
  const { getFieldDecorator } = form;

  const [orderInfo, setOrderInfo] = useState({
    shippingAddress: "",
    billingAddress: "",
    shipMethod: "",
    payMethod: "",
    payMethodNumber: ""
  });
  // useEffect(() => {
  //   fetch(
  //     `http://localhost:2019/cart/user/username/${window.localStorage.getItem(
  //       "username"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization:
  //           "Bearer " + window.localStorage.getItem("access_token"),
  //         // "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   );
  // }, []);
  const changeInputHandler = e => {
    console.log(orderInfo);
    // need this to add to order price
    // if(e.target.shipMethod) {

    // }
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }
  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Order Placement"
        headStyle={{ background: theme.black, color: theme.white }}
      >
        {/* <Form.Item>
          <Button type="primary">Review Cart</Button>
        </Form.Item> */}
        <Form.Item label="Shipping Address">
          {getFieldDecorator("shipping", {
            rules: [
              { required: true, message: "Please input a shipping address!" }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Shipping Address"
              name="shippingAddress"
              onChange={changeInputHandler}
            />
          )}
        </Form.Item>
        <Form.Item label="Billing Address">
          {getFieldDecorator("billing", {
            rules: [
              { required: true, message: "Please input a billing address!" }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Billing Address"
              name="billingAddress"
              onChange={changeInputHandler}
            />
          )}
        </Form.Item>

        <Form.Item label="Shipping Method">
          {getFieldDecorator("radio-group", {
            rules: [
              {
                required: true,
                message: "Please choose a shipping method"
              }
            ]
          })(
            <Radio.Group name="shipMethod" onChange={changeInputHandler}>
              <Radio value="3 Day Shipping - $5.99">
                3 Day Shipping - $5.99
              </Radio>
              <Radio value="Free Shipping">
                1 Week or More - Free Shipping
              </Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Payment Method">
          {getFieldDecorator("payment-group", {
            rules: [
              {
                required: true,
                message: "Please choose a credit card or gift card"
              }
            ]
          })(
            <Radio.Group name="payMethod" onChange={changeInputHandler}>
              <Radio value="Credit Card">Credit Card</Radio>
              <Radio value="Gift Card">Gift Card</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Add Number">
          {getFieldDecorator("number", {
            rules: [
              {
                required: true,
                message: "Please input a card or gift card number",
                pattern: /\d+/
              }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Card or Gift card number"
              name="payMethodNumber"
              onChange={changeInputHandler}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order - {" $155.44"}
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};
const WrappedCheckoutForm = Form.create({ name: "normal_checkout" })(
  CheckoutForm
);

export default withTheme(WrappedCheckoutForm);
