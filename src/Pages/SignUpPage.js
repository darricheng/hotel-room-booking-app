// A signup page where users can create an account by entering their email and password.

// Ant Design imports
import { Button, Checkbox, Form, Input, Typography } from "antd";

// Module imports
import { useContext } from "react";

// Firebase imports
// See https://firebase.google.com/docs/auth/web/start#sign_up_new_users
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import the auth instance from firebaseConfig.js
import { auth } from "../firebase/firebaseConfig";

// Import the AuthContext so that we can check if the user is logged in
import { AuthContext } from "../firebase/AuthContext";

const signUpPageStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

export default function SignUpPage() {
  // Check if the user is logged in
  const { user } = useContext(AuthContext);
  console.log(user);

  // Handle the form submission
  const onFinish = (values) => {
    console.log("Success:", values);

    // Create the new user with the email and password
    createUserWithEmailAndPassword(auth, values.email, values.password)
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
  // Handle the form submission failure
  const onFinishFailed = (errorInfo) => {
    // Log the error info to the console
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={signUpPageStyle}>
      <Typography.Title>Sign Up</Typography.Title>
      {/* If the user is already logged in, don't show the form (they aren't supposed to be at this page anyway!) */}
      {user ? (
        <Typography.Title level={2}>
          Wait, how'd you get here? You're already logged in!
        </Typography.Title>
      ) : (
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
      )}
    </div>
  );
}
