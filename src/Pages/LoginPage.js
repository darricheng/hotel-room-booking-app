// A login page where users can login to their accounts by entering their email and password.

// Ant Design imports
import { Button, Checkbox, Form, Input, Typography } from "antd";

// Module imports
import { useContext } from "react";
import { Link } from "react-router-dom";

// Firebase imports
// See https://firebase.google.com/docs/auth/web/start#sign_up_new_users
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "../firebase/AuthContext";

const LoginPageStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

export default function LoginPage() {
  // Check if the user is logged in
  const { user } = useContext(AuthContext);

  // Handle the form submission
  const onFinish = (values) => {
    console.log("Success:", values);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // TODO: Redirect to the home page
        console.log("User created successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error code: ${errorCode}, Error message: ${errorMessage}`
        );
      });
  };
  const onFinishFailed = (errorInfo) => {
    // Log the error info to the console
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={LoginPageStyle}>
      <Typography.Title>Login</Typography.Title>
      {/* If the user is already logged in, don't show the form (they aren't supposed to be at this page anyway!) */}
      {user ? (
        <Typography.Paragraph>You are already logged in!</Typography.Paragraph>
      ) : (
        <>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph>
            Don't have an account yet? <Link to="/signup">Sign up here!</Link>
          </Typography.Paragraph>
        </>
      )}
    </div>
  );
}
