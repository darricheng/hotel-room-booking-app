// A signup page where users can create an account by entering their email and password.

// Ant Design imports
import { Select, Button, Checkbox, Form, Input, Typography } from "antd";

// Module imports
import { useContext } from "react";

// Firebase imports
// See https://firebase.google.com/docs/auth/web/start#sign_up_new_users
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import the auth instance from firebaseConfig.js
import { auth } from "../firebase/firebaseConfig";

// Import the AuthContext so that we can check if the user is logged in
import { AuthContext } from "../firebase/AuthContext";

// Get the Option component from the Select component
const { Option } = Select;

const signUpPageStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const callCreateUserAPI = async (firebaseData, userInputData) => {
  // Extract the uid and email from the firebaseData object
  const { uid, email } = firebaseData;
  // Extract all other necessary details from the form input
  const { name, gender, contactNumber, address } = userInputData;

  // Create the data object to send to the API
  const dataObj = {
    name,
    email,
    firebase_id: uid,
    contact_number: contactNumber,
    gender,
    address,
    lastLogin: new Date(),
  };

  try {
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function SignUpPage() {
  // Check if the user is logged in
  const { user } = useContext(AuthContext);
  console.log(user);

  // Handle the form submission
  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      // Create the new user with the email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      // Call the createUser API endpoint to create the userCredential in the database
      const user = await callCreateUserAPI(values);
      console.log("User created successfully: " + user);
      // TODO: Redirect to the home page
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error code: ${errorCode}, Error message: ${errorMessage}`);
    }
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
            label="Name"
            name="name"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="contactNumber"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your address",
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
