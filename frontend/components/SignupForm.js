import { Form, Icon, Input, Button, Card, message } from "antd";
import styled, { withTheme } from "styled-components";
import { StyledAuthForm } from "./styles/StyledAuthForm";
import axios from "axios";
import Router from "next/router";
import { baseAxios } from "../lib/axiosInstances";
const SignUpForm = ({
  form,
  theme,
  signupInfo,
  setSignupInfo,
  setTab,
  LOGIN
}) => {
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      baseAxios.post("/signup", {
          username: values.username,
          password: values.password
        })
        .then(function(response) {
          console.log(response);
          const { data } = response;
          message.success(
            `Hi ${
              data.username
            }! You have successfully signed up and are ready to login!`,
            3
          );
          setTab(LOGIN);
        })
        .catch(function(error) {
          console.error(error, "we have an error");
        });
    });
  }
  const changeInputHandler = e => {
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
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedSignUpForm = Form.create({ name: "normal_login" })(SignUpForm);

export default withTheme(WrappedSignUpForm);
