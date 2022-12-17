import { Form, Select, DatePicker, Button } from "antd";

// Necessary import inits
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function RoomSearchForm(props) {
  // Props
  const {
    roomSearchSetting,
    handleFormSubmit,
    handleDateChange,
    handleRoomTypeChange,
    formJustifyContent,
    requireRoomTypeSelector,
    buttonProps,
  } = props;

  // Form Style
  const roomSearchFormStyle = {
    display: "flex",
    justifyContent: formJustifyContent,
  };

  // Function to handle room search form submission failure.
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      layout="inline" // Set the range picker and button to be side-by-side
      style={roomSearchFormStyle}
      onFinish={handleFormSubmit}
      onFinishFailed={onFinishFailed}
      initialValues={{
        dateRange: [roomSearchSetting.startDate, roomSearchSetting.endDate],
        roomType: roomSearchSetting.roomType,
      }}
    >
      <Form.Item name="dateRange">
        <RangePicker
          size="large"
          allowClear={false} // Disable the clear button
          onChange={handleDateChange}
        />
      </Form.Item>

      {/* Show the roomType selector conditionally */}
      {requireRoomTypeSelector && (
        <Form.Item name="roomType">
          <Select size="large" onChange={handleRoomTypeChange}>
            <Option value="single-room">Single Room</Option>
            <Option value="double-room">Double Room</Option>
            <Option value="deluxe-room">Deluxe Room</Option>
            <Option value="suite-room">Suite Room</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item>
        <Button
          type="primary"
          icon={buttonProps.icon}
          size="large"
          htmlType="submit"
        >
          {buttonProps.text}
        </Button>
      </Form.Item>
    </Form>
  );
}
