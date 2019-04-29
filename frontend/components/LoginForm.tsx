import {Form, Icon, Input, Button, Card} from "antd";
import {withTheme} from "styled-components";
import {StyledAuthForm} from "./styles/StyledAuthForm";
import Router from "next/router";
import qs from "qs";
import {Theme as ITheme, InputEventTarget} from "../interfaces/index";
import {message} from "antd";
import {useState} from "react";
import {createBaseAxios} from "../lib/axiosInstances";
import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
interface LoginValues {
  username: string;
  password: string;
}
interface LoginData {
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
}
interface Props {
  form: any;
  theme: ITheme;
  loginInfo: LoginValues;
  setLoginInfo: Function;
}

const LoginForm: React.SFC<Props> = ({
  form,
  theme,
  loginInfo,
  setLoginInfo,
}) => {
  const {getFieldDecorator} = form;
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    form.validateFields(async (err: object, values: LoginValues) => {
      if (err) {
        return;
      }
      setLoading(true);
      try {
        const bodyData = {
          grant_type: publicRuntimeConfig.GRANT_TYPE_PASSWORD,
          username: values.username,
          password: values.password,
        };
        const {data}: LoginData = await createBaseAxios()({
          method: "post",
          url: "/oauth/token",
          headers: {"content-type": "application/x-www-form-urlencoded"},
          timeout: 1000 * 10,
          data: qs.stringify(bodyData),
          auth: {
            username: publicRuntimeConfig.CLIENT_ID,
            password: publicRuntimeConfig.CLIENT_SECRET,
          },
          validateStatus: function(status: number) {
            if (status === 400) {
              message.error("Wrong username or password, try again!");
            }
            return status === 200;
          },
        });
        window.localStorage.setItem("access_token", data.access_token);
        window.localStorage.setItem("username", values.username);
        Router.push({
          pathname: "/shop",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  };

  const changeInputHandler = (e: InputEventTarget) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit} aria-busy={isLoading}>
      <Card
        title="Login"
        headStyle={{background: theme.black, color: theme.white}}
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
            disabled={isLoading}
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedLoginForm = Form.create({name: "normal_login"})(LoginForm);

export default withTheme(WrappedLoginForm);
