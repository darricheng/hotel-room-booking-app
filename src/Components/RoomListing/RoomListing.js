import React from "react";
import "./RoomListing.css";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";

const RoomListing = ({ room }) => {
  return (
    <Col span={12} className="room-card-container">
      <Row>
        <Col className="room-card">
          <Link
            to={{
              pathname:
                "/rooms/" +
                // Convert room name to lowercase and replace spaces with hyphens
                room.name.toLowerCase().replace(/ /g, "-"),
            }}
          >
            <Card
              hoverable
              style={{ width: 500 }}
              cover={<img alt={room.name} src={room.image} />}
            >
              <Card.Meta title={room.name} description={room.description} />
            </Card>
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default RoomListing;
