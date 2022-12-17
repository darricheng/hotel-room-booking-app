// Asset imports
import homePageBanner from "../assets/hotel-home-page-banner.jpg";
import { SearchOutlined } from "@ant-design/icons";
import HotelLogoSvg from "../Components/HotelLogoSvg";

// Component imports
import RoomSearchForm from "../Components/RoomSearchForm";

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

export default function HomePage(props) {
  const {
    roomSearchSetting,
    handleRoomSearch,
    handleDateChange,
    handleRoomTypeChange,
  } = props;

  return (
    <div className="site-homepage-banner-content" style={bannerImageStyle}>
      <div className="site-homepage-banner-title" style={mainHotelLogoStyle}>
        <HotelLogoSvg sizeMultiplier={8} />
      </div>
      <div className="intra-banner-content" style={roomSearchFormDivStyle}>
        <RoomSearchForm
          roomSearchSetting={roomSearchSetting}
          handleFormSubmit={handleRoomSearch}
          handleDateChange={handleDateChange}
          handleRoomTypeChange={handleRoomTypeChange}
          formJustifyContent={"center"}
          requireRoomTypeSelector={true}
          buttonProps={{
            text: "Find Rooms",
            icon: <SearchOutlined />,
          }}
        />
      </div>
    </div>
  );
}
