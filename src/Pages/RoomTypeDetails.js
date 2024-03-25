// Module imports
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

// Component imports
import RoomSearchForm from "../Components/RoomSearchForm";

// Asset imports
import { roomDescriptions } from "../assets/roomDescriptions";

// Ant design imports
import { Col, Row, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

// Auth imports
import { AuthContext } from "../firebase/AuthContext";

export default function RoomTypeDetails(props) {
  // Check if the user is logged in
  const { user } = useContext(AuthContext);

  // Get the room search setting from App state
  // setRoomSearchSetting is for setting the single source of truth for the user's selected dates and room type
  const { roomSearchSetting, setRoomSearchSetting, handleDateChange } = props;

  // State to store the rooms returned from the api call
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the room type from the url instead of App state because the user may directly access the room type details page
  const { roomType } = useParams();

  // Replace the dash in roomType with a space, then capitalize the first letter of each word
  // e.g. single-room => Single Room
  const roomName = roomType
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Set the room type in App state to the room type in the url if the room type in the url is different from the room type in App state
  // Might happen if the user directly accesses the room type details page
  useEffect(() => {
    setRoomSearchSetting({
      ...roomSearchSetting,
      roomType: roomType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomType]); // Only want the effect to run when the room type changes

  // Get the rooms from the api when the room type changes
  useEffect(() => {
    // Function to get the available rooms from the api
    const getRoomsFromApi = async (roomType) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/rooms?room_type=${roomType}`,
        );
        const rooms = await response.json();
        setRooms(rooms);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getRoomsFromApi(roomType);
  }, [roomType]);

  // Check whether there are any rooms available
  const roomsAvailable = rooms.some((room) => room.booked === false);

  // Convert roomType to camelCase for importing the relevant room description
  // e.g. single-room => singleRoom
  const roomTypeCamelCase = roomType.replace(/-([a-z])/g, (g) =>
    g[1].toUpperCase(),
  );

  // Function to book a room
  // Redirects the user to fill in details about their booking
  const navigate = useNavigate();
  const bookRoom = (room) => {
    console.log("Book room", room);
    navigate(`/book-room`);
  };

  return (
    <div style={{ padding: "48px" }}>
      {/* Check whether the room type is valid */}
      {loading ? (
        <Typography.Title level={1}>Loading...</Typography.Title>
      ) : rooms.length > 0 ? (
        <>
          <Row gutter={48}>
            <Col span={12}>
              <img
                // Import image depending on the room type
                src={require("../assets/" + roomType + ".jpg")}
                alt={roomName}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Typography.Title level={1}>{roomName}</Typography.Title>
              <Typography.Paragraph>
                {roomDescriptions[roomTypeCamelCase]}
              </Typography.Paragraph>
              {roomsAvailable ? (
                <p>Rooms available</p>
              ) : (
                <p>No rooms available</p>
              )}
              {/* Inform user that they must be logged in to book a room */}
              {user ? (
                <></>
              ) : (
                <Typography.Paragraph>
                  Please log in to book a room
                </Typography.Paragraph>
              )}
              <RoomSearchForm
                roomSearchSetting={roomSearchSetting}
                handleFormSubmit={bookRoom}
                handleDateChange={handleDateChange}
                formJustifyContent={"start"}
                requireRoomTypeSelector={false}
                buttonProps={{
                  text: "Book a Room",
                  icon: <ArrowRightOutlined />,
                  // Disable the book button if there are no rooms available or the user is not logged in
                  disabled: !roomsAvailable || !user,
                }}
              />
            </Col>
          </Row>
        </>
      ) : (
        // If no rooms are returned from the api, then the room type is invalid
        <Typography.Title level={1}>No such room</Typography.Title>
      )}
    </div>
  );
}
