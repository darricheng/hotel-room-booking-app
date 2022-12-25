import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import singleRoomImage from "../assets/single-room.jpg";
import doubleRoomImage from "../assets/double-room.jpg";
import deluxeRoomImage from "../assets/deluxe-room.jpg";
import suiteRoomImage from "../assets/suite-room.jpg";
import RoomListing from "../Components/RoomListing/RoomListing";

const RoomListingPage = () => {
  const [rooms, setRooms] = useState([]);

  const main = async () => {
    // let response = await axios({
    //     URL: process.env.REACT_APP_ROOMS_URL | "localhost:27017",

    // })

    setRooms([
      { name: "Single Room", image: singleRoomImage },
      { name: "Double Room", image: doubleRoomImage },
      { name: "Deluxe Room", image: deluxeRoomImage },
      { name: "Suite Room", image: suiteRoomImage },
    ]);
  };
  useEffect(() => {
    // API call to backend to get rooms here
    main();
  }, []);
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            {rooms.map((room) => {
              return <RoomListing room={room} />;
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default RoomListingPage;
