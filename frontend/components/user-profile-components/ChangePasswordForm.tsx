import {useState} from "react";
import {StyledAuthForm} from "../styles/StyledAuthForm";
import {Card, Form, Input, Icon} from "antd";
import {withTheme} from "styled-components";
import {InputEventTarget, Theme as ITheme} from "../../interfaces/index";
import {Button} from "antd";
import {createBearerAxios} from "../../lib/axiosInstances";
interface Props {
  form: {
    getFieldDecorator: Function;
    validateFields: Function;
    getFieldValue: Function;
  };
  theme: ITheme;
}
interface PasswordValues {
  currentPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}
const ChangePasswordForm: React.SFC<Props> = ({form, theme}) => {
  const {getFieldDecorator, getFieldValue} = form;
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const changeInputHandler = (e: InputEventTarget) => {
    setPasswords({...passwords, [e.target.name]: e.target.value});
  };
  //@ts-ignore
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("new-password")) {
      callback("Your new passwords don't match!");
    } else {
      callback();
    }
  };

  //@ts-ignore
  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      form.validateFields(["new-password-again"], {force: true});
    }
    callback();
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    form.validateFields(async (err: object, values: PasswordValues) => {
      if (err) {
        return;
      }
      setIsLoading(true);
      try {
        const {data} = await createBearerAxios()({
          method: "put",
          url: "/users/update",
          data: {
            rawPassword: passwords.currentPassword,
            password: passwords.newPassword,
          },
        });

        console.log(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit} aria-busy={isLoading}>
      <Card
        title="Change Password"
        headStyle={{background: theme.black, color: theme.white}}
      >
        <Form.Item label="Current Password">
          {getFieldDecorator("current-password", {
            rules: [
              {
                required: true,
                message: "Please input your current Password!",
              },
            ],
          })(
            <Input
              prefix={
                <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
              }
              type="password"
              placeholder="Enter Current Password"
              name="currentPassword"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
        <Form.Item label="New Password">
          {getFieldDecorator("new-password", {
            rules: [
              {required: true, message: "Please input your New Password!"},
              {validator: validateToNextPassword},
            ],
          })(
            <Input
              prefix={
                <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
              }
              type="password"
              placeholder="Enter New Password"
              name="newPassword"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
        <Form.Item label="New Password Again">
          {getFieldDecorator("new-password-again", {
            rules: [
              {
                required: true,
                message: "Please input your New Password Again!",
              },
              {validator: compareToFirstPassword},
            ],
          })(
            <Input
              prefix={
                <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
              }
              type="password"
              placeholder="Enter New Password Again"
              name="newPasswordAgain"
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
            Submit
          </Button>
        </Form.Item>
      </Card>
    </StyledAuthForm>
  );
};

const WrappedChangePasswordForm = Form.create({name: "password_changer"})(
  ChangePasswordForm,
);

export default withTheme(WrappedChangePasswordForm);
