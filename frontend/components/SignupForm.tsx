import { Form, Icon, Input, Button, Card, message, Spin } from "antd";
import { withTheme } from "styled-components";
import { StyledAuthForm } from "./styles/StyledAuthForm";
import { baseAxios } from "../lib/axiosInstances";
import { Theme as ITheme, InputEventTarget } from "../interfaces/index";
import { useState } from 'react';
interface Props {
  form: any,
  theme: ITheme,
  signupInfo: SignupValues,
  setSignupInfo: Function,
  setTab: Function,
  LOGIN: string
}

interface SignupValues {
  username: string,
  password: string
}
interface SignupSubmitData {
  data: {
    authority: string,
    billingaddress: null,
    customername: null,
    customerphone: null,
    email: null,
    orderhistory: null,
    paymentmethod: null,
    productsincart: null,
    role: string,
    shippingaddress: null,
    totalorderhistory: null,
    userid: number,
    username: string,
  }
}

const SignUpForm : React.SFC<Props> = ({
  form,
  theme,
  signupInfo,
  setSignupInfo,
  setTab,
  LOGIN
}) => {
  const { getFieldDecorator } = form;
  const [ isLoading, setLoading ] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    form.validateFields((err: object, values: SignupValues) => {
      if (err) {
        return;
      }
      setLoading(true);
      baseAxios.post("/signup", {
          username: values.username,
          password: values.password
        })
        .then(function({ data }: SignupSubmitData) {
          if(data.username === undefined) {
            message.error(`${values.username} has already been taken, try again.`)
            setTimeout(() => {
              setLoading(false);
            },1000)
          }
          else {
            message.success(
              `Hi ${
                data.username
              }! You have successfully signed up and are ready to login!`,
              3
            );
            setLoading(false);
            setTab(LOGIN);
          }
       
        })
        .catch(function(error: object) {
          console.error(error, "we have an error");
        });
    });
  }
  const changeInputHandler = (e: InputEventTarget) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Signup"
        headStyle={{ background: theme.black, color: theme.white }}
      >
        {/* <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input an email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item> */}
        <Form.Item label="Username">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input a username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              name="username"
              onChange={changeInputHandler}
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeInputHandler}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon = {"rest"} loading={isLoading} disabled={isLoading}>
          Signup
          </Button>
         
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedSignUpForm = Form.create({ name: "normal_login" })(SignUpForm);

export default withTheme(WrappedSignUpForm);
