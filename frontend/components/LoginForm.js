import { Form, Icon, Input, Button, Card } from "antd";
import styled, { withTheme } from "styled-components";
import { StyledAuthForm } from "./styles/StyledAuthForm";
import axios from "axios";

const LoginForm = ({ form, theme, loginInfo, setLoginInfo }) => {
  const { getFieldDecorator } = form;
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      fetch("http://localhost:2019/orders", {
        headers: {
          Authorization: "Bearer 08c7aa6a-fa8b-45b5-8968-71fd8692892b",
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(res => {
          const json = res.json();
          json.then(res => {
            console.log(res);
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  const changeInputHandler = e => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <Card
        title="Login"
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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default withTheme(WrappedLoginForm);
