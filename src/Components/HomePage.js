// Module imports
import { useState, useEffect } from "react";
import { DatePicker, Button, Tooltip, Space } from "antd";
import dayjs from "dayjs";

// Asset imports
import homePageBanner from "../assets/hotel-home-page-banner.jpg";
import { SearchOutlined } from "@ant-design/icons";
import HotelLogoSvg from "../assets/hotel-82-logo-white.js";

// Necessary import inits
dayjs().format();
const { RangePicker } = DatePicker;

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
  margin: "0 auto",
};
const dateRangeStyle = {
  position: "absolute",
  bottom: "4vw",
  left: "0",
  right: "0",
  margin: "0 auto",
};

// Initialise a default date range with the current date and the next day.
const defaultDate = {
  startDate: dayjs().toDate(),
  endDate: dayjs().add(1, "day").toDate(),
};

export default function HomePage() {
  const [dateRange, setDateRange] = useState(defaultDate);

  // useEffect to log the dateRange state whenever it changes.
  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  // Function to handle date change by updating the date range state.
  const handleDateChange = (dates, dateStrings) => {
    setDateRange({
      startDate: dates[0].toDate(),
      endDate: dates[1].toDate(),
    });
  };

  return (
    <div className="site-homepage-banner-content" style={bannerImageStyle}>
      <div className="site-homepage-banner-title" style={mainHotelLogoStyle}>
        <HotelLogoSvg sizeMultiplier={8} />
      </div>
      <div className="intra-banner-content" style={dateRangeStyle}>
        {/* Set the range picker and button to be side-by-side */}
        <Space align="end">
          <RangePicker
            size="large"
            defaultValue={[dayjs(), dayjs().add(1, "day")]}
            onChange={handleDateChange}
          />
          <Tooltip title="Find Rooms">
            <Button type="primary" icon={<SearchOutlined />} size="large">
              Find Rooms
            </Button>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}
