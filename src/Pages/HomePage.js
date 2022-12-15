// Module imports
import { useState, useEffect } from "react";
import { DatePicker, Button, Select, Form } from "antd";
import dayjs from "dayjs";

// Asset imports
import homePageBanner from "../assets/hotel-home-page-banner.jpg";
import { SearchOutlined } from "@ant-design/icons";
import HotelLogoSvg from "../Components/HotelLogoSvg";

// Necessary import inits
dayjs().format();
const { RangePicker } = DatePicker;
const { Option } = Select;

// Styles
const bannerImageStyle = {
  position: "relative",
  textAlign: "center",
  // Width and height are set to 100vw and 40vw so that the image always appears as the intended size
  // regardless of the screen size.
  // It's based on view width because we always want the image to be 100% of the screen width.
  width: "100vw",
  height: "40vw",
  backgroundImage: `url(${homePageBanner})`,
  backgroundSize: "cover",
};
const mainHotelLogoStyle = {
  position: "absolute",
  top: "4vw",
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
};
const roomSearchFormDivStyle = {
  position: "absolute",
  bottom: "4vw",
  left: "0",
  right: "0",
};
const roomSearchFormStyle = {
  display: "flex",
  justifyContent: "center",
};

export default function HomePage(props) {
  const { setroomSearchSetting, handleRoomSearch } = props;
  // Function to handle date change by updating the date range state.
  const handleDateChange = (dates, dateStrings) => {
    setroomSearchSetting((prev) => {
      return {
        ...prev,
        startDate: dates[0] ? dates[0].toDate() : null,
        endDate: dates[1] ? dates[1].toDate() : null,
      };
    });
  };
  // Function to handle room type change by updating the room type state.
  const handleRoomTypeChange = (value) => {
    setroomSearchSetting((prev) => {
      return {
        ...prev,
        roomType: value,
      };
    });
  };

  // Function to handle room search form submission failure.
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className="site-homepage-banner-content" style={bannerImageStyle}>
      <div className="site-homepage-banner-title" style={mainHotelLogoStyle}>
        <HotelLogoSvg sizeMultiplier={8} />
      </div>
      <div className="intra-banner-content" style={roomSearchFormDivStyle}>
        {/* Set the range picker and button to be side-by-side */}
        <Form
          layout="inline"
          style={roomSearchFormStyle}
          onFinish={handleRoomSearch}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="dateRange">
            <RangePicker
              size="large"
              allowClear={false} // Disable the clear button
              defaultValue={[dayjs(), dayjs().add(1, "day")]}
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item name="roomType">
            <Select
              defaultValue="Single Room"
              size="large"
              onChange={handleRoomTypeChange}
            >
              <Option value="Single Room">Single Room</Option>
              <Option value="Double Room">Double Room</Option>
              <Option value="Deluxe Room">Deluxe Room</Option>
              <Option value="Suite Room">Suite Room</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              htmlType="submit"
            >
              Find Rooms
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
