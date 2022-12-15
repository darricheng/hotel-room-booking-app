import React from "react";
import "./RoomListing.css";
import { Col, Row } from "antd";

const RoomListing = ({ room }) => {
  return (
    <Col span={12} className="room-card-container">
      <Row>
        <Col className="room-card">
          <img src={room.image} width="300" height="300" alt={room.name} />
          <h2>{room.name}</h2>
        </Col>
      </Row>
    </Col>
  );
};

export default RoomListing;
