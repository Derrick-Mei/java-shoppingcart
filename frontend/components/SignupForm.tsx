import {Form, Icon, Input, Button, Card, message, Spin} from "antd";
import {withTheme} from "styled-components";
import {StyledAuthForm} from "./styles/StyledAuthForm";
import {createBaseAxios} from "../lib/axiosInstances";
import {Theme as ITheme, InputEventTarget} from "../interfaces/index";
import {useState} from "react";
import emailRegex from "../lib/formValidationRegex/emailRegex";
interface Props {
  form: any;
  theme: ITheme;
  signupInfo: SignupValues;
  setSignupInfo: Function;
  setTab: Function;
  LOGIN: string;
}

interface SignupValues {
  username: string;
  password: string;
  email: string;
}
interface SignupSubmitData {
  data: {
    authority: string;
    billingaddress: null;
    customername: null;
    customerphone: null;
    email: null;
    orderhistory: null;
    paymentmethod: null;
    productsincart: null;
    role: string;
    shippingaddress: null;
    totalorderhistory: null;
    userid: number;
    username: string;
  };
}

const SignupForm: React.SFC<Props> = ({
  form,
  theme,
  signupInfo,
  setSignupInfo,
  setTab,
  LOGIN,
}) => {
  const {getFieldDecorator} = form;
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    form.validateFields(async (err: object, values: SignupValues) => {
      if (err) {
        return;
      }
      setLoading(true);
      try {
        const {data}: SignupSubmitData = await createBaseAxios()({
          method: "post",
          url: "/signup",
          data: {
            username: values.username,
            password: values.password,
            email: values.email,
          },
          timeout: 1000 * 10,
          validateStatus: function(status: number) {
            if (status === 400) {
              message.error(
                "User with that email or username exists already",
              );
            } else if (status !== 200) {
              message.error(
                "There must be a problem with the server, try again later.",
              );
            }
            return status === 200;
          },
        });
        if (data.username === undefined) {
          message.error(
            `${values.username} has already been taken, try again.`,
          );
        } else {
          message.success(
            `Hi ${
              data.username
            }! You have successfully signed up and are ready to login!`,
            3,
          );
          setTab(LOGIN);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  }
  const changeInputHandler = (e: InputEventTarget) => {
    setSignupInfo({...signupInfo, [e.target.name]: e.target.value});
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Signup"
        headStyle={{background: theme.black, color: theme.white}}
      >
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input an email!",
                pattern: emailRegex,
              },
            ],
          })(
            <Input
              prefix={
                <Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />
              }
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator("username", {
            rules: [{required: true, message: "Please input a username!"}],
          })(
            <Input
              prefix={
                <Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />
              }
              placeholder="Username"
              name="username"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [
              {required: true, message: "Please input your Password!"},
            ],
          })(
            <Input
              prefix={
                <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
              }
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={"rest"}
            loading={isLoading}
            disabled={isLoading}
          >
            Signup
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedSignupForm = Form.create({name: "normal_login"})(SignupForm);

export default withTheme(WrappedSignupForm);
