// Module imports
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

// Asset imports
import homePageBanner from "../assets/hotel-home-page-banner.jpg";

dayjs().format();

const { RangePicker } = DatePicker;

const bannerImageStyle = {
  textAlign: "center",
  // Width and height are set to 100vw and 40vw so that the image always appears as the intended size
  // regardless of the screen size.
  // It's based on view width because we always want the image to be 100% of the screen width.
  width: "100vw",
  height: "40vw",
  backgroundImage: `url(${homePageBanner})`,
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
    <div className="site-homepage-content" style={bannerImageStyle}>
      <h1>Hotel 82</h1>
      <RangePicker
        size="large"
        defaultValue={[dayjs(), dayjs().add(1, "day")]}
        onChange={handleDateChange}
      />
    </div>
  );
}
