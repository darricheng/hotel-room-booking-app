import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../firebase/AuthContext";
import { Typography, Card } from "antd";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "48px 0",
};

export default function ProfilePage() {
  // Get the user's data from firebase
  const { user } = useContext(AuthContext);

  // Initialise the user's booking data as an empty array
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Import the user's booking data from the database
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Fetch the user ObjectId from the database
        const userResponse = await fetch(
          process.env.REACT_APP_API_URL + "/users/?firebase_id=" + user.uid,
        );
        const userData = await userResponse.json();
        const userObjectId = userData[0]._id;

        const response = await fetch(
          process.env.REACT_APP_API_URL + "/rooms/?booked_by=" + userObjectId,
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user.uid]);

  return (
    <div style={divStyle}>
      <Typography.Title level={1}>Your Bookings</Typography.Title>
      {loading ? (
        <Typography.Text>Loading...</Typography.Text>
      ) : (
        bookings.map((booking) => (
          <Card
            key={booking._id}
            style={{ width: 600, marginBottom: 16 }}
            cover={
              <img
                alt={booking.room_type}
                src={require(`../assets/${booking.room_type}.jpg`)}
                style={{ height: 300 }}
              />
            }
          >
            <Card.Meta
              title={
                // Convert the room type to a human readable string
                booking.room_type
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")
              }
              description={`${new Date(
                booking.booked_start_date,
              ).toDateString()} - ${new Date(
                booking.booked_end_date,
              ).toDateString()}`}
            />
          </Card>
        ))
      )}
    </div>
  );
}
