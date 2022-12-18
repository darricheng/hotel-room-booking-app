// Module imports
import { useContext, useState } from "react";
import { AuthContext } from "../firebase/AuthContext";
import { Form, Select, Typography, Input } from "antd";

// Necessary component inits
const { Option } = Select;

export default function BookRoomPage(props) {
  const { roomSearchSetting } = props;
  const { roomType, startDate, endDate } = roomSearchSetting;

  // Convert dash to space and capitalize the first letter of each word
  // e.g. single-room => Single Room
  const roomName = roomType
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Get the details of the logged in user
  const { user } = useContext(AuthContext);

  // State to store the number of guests in the booking
  const [numGuests, setNumGuests] = useState(1);

  return (
    <div>
      <Typography.Title level={1}>Booking: {roomName}</Typography.Title>
      <Form>
        <Form.Item label="numGuests">
          <Select value={numGuests} onChange={(value) => setNumGuests(value)}>
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
            <Form.Item label={`Guest ${index + 1} name`}>
              <Input />
            </Form.Item>
          ))}
      </Form>
    </div>
  );
}
