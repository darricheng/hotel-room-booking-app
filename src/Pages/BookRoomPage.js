// Module imports
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthContext";
import { Form, Select, Typography, Input, Button } from "antd";

// Necessary component inits
const { Option } = Select;

// Function to call the api to book a room
const callBookRoomApi = async (roomType, bookingDetails) => {
  console.log(bookingDetails);
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/rooms/book/" + roomType,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      }
    );
    console.log("response: ", response);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

// Function to call the create many guests api
const callCreateManyGuestsApi = async (guestDetails) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/guests/addMany",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestDetails),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to split special requests by commas into an array, then trims whitespace from both ends
const parseSpecialRequests = (data) => {
  // Split data by commas into an array
  const arr = data.split(",");
  // Remove whitespaces from the ends of each array element
  const noWhitespaceArr = arr.map((value) => value.trim());

  return noWhitespaceArr;
};

// Handle the form submission failure
const onFinishFailed = (errorInfo) => {
  // Log the error info to the console
  console.error("Failed:", errorInfo);
};

export default function BookRoomPage(props) {
  const { roomSearchSetting } = props;
  const { roomType, startDate, endDate } = roomSearchSetting;

  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // Convert dash to space and capitalize the first letter of each word
  // e.g. single-room => Single Room
  const roomName = roomType
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Get the details of the logged in user
  const { user } = useContext(AuthContext);

  // Booking details object that will be passed to the api based on the already confirmed booking details
  const priorConfirmedBookingDetails = {
    booked_by: user.uid,
    // Convert the dayjs date to a JS Date Object
    booked_start_date: startDate.toDate(),
    booked_end_date: endDate.toDate(),
  };

  // State object for the number of guests
  const [numGuests, setNumGuests] = useState(1);

  // Function that processes the booking submission
  const processBookingSubmission = async (values) => {
    // Get the form data from the values object
    console.log(values);

    // Get the special requests from the form data
    const specialRequests = values.specialRequests
      ? parseSpecialRequests(values.specialRequests)
      : [];

    // Store the number of guests in a variable
    const numGuests = values.numGuests;

    // Create an array of the guest details
    const guestDetails = [];
    for (let i = 0; i < numGuests; i++) {
      // Get the guest details from the form data
      const guestName = values[`name${i}`];
      const breakfast = values[`breakfast${i}`];
      const lunch = values[`lunch${i}`];
      const dinner = values[`dinner${i}`];
      const guest = {
        name: guestName,
        breakfast: breakfast === "yes",
        lunch: lunch === "yes",
        dinner: dinner === "yes",
      };
      guestDetails.push(guest);
    }

    // Call the create many guests api
    const createdGuestsData = await callCreateManyGuestsApi(guestDetails);
    console.log(createdGuestsData);

    // Add the guest ids to the booking details object
    const guestIds = createdGuestsData.map((guest) => guest._id);

    // Create the booking details object
    const bookingDetails = {
      ...priorConfirmedBookingDetails,
      guests: guestIds,
      add_ons: specialRequests,
    };

    // Call the book room api
    const resStatus = await callBookRoomApi(roomType, bookingDetails);

    // Navigate to the booking details page
    if (resStatus === 200) {
      console.log("Booking successful");
      // Navigate to the booking confirmation page
      navigate("/booking-confirmation");
    } else {
      console.log("Booking failed");
    }
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={divStyle}>
      <Typography.Title level={1}>Booking: {roomName}</Typography.Title>
      <Form
        name="Booking Form"
        onFinish={processBookingSubmission}
        onFinishFailed={onFinishFailed}
        initialValues={{ numGuests: numGuests }}
      >
        <Form.Item
          label="Number of Guests"
          name="numGuests"
          rules={[
            {
              type: "number",
            },
          ]}
        >
          <Select value={numGuests} onChange={(val) => setNumGuests(val)}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
          </Select>
        </Form.Item>
        {/* Show number of guest details input fields based on numGuests */}
        {Array(numGuests)
          .fill()
          .map((_, index) => (
            <div key={index}>
              <Typography.Title level={3}>Guest {index + 1}</Typography.Title>
              <Form.Item
                label="Name"
                name={"name" + index}
                rules={[
                  {
                    type: "string",
                    required: true,
                    message: `Please input the name of guest ${index + 1}`,
                  },
                ]}
              >
                <Input placeholder="e.g. John Doe" />
              </Form.Item>
              <Typography.Title level={4}>Meal Requirements</Typography.Title>
              <Form.Item
                label="Breakfast"
                name={"breakfast" + index}
                initialValue="yes"
              >
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Lunch"
                name={"lunch" + index}
                initialValue="yes"
              >
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Dinner"
                name={"dinner" + index}
                initialValue="yes"
              >
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
            </div>
          ))}
        <Typography.Title level={3}>Other info</Typography.Title>
        <Form.Item
          label="Special Requests"
          name="specialRequests"
          rules={[
            {
              type: "string",
              message: "State any special requests here",
            },
          ]}
        >
          <Input placeholder="e.g. extra pillows" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Booking
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
