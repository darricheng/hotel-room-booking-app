import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function RoomTypeDetails() {
  // State to store the available rooms returned from the api call
  const [rooms, setRooms] = useState([]);

  const { roomType } = useParams();
  useEffect(() => {
    const getRoomsFromApi = async (roomType) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/rooms?room_type=${roomType}`
        );
        const rooms = await response.json();
        setRooms(rooms);
      } catch (error) {
        console.error(error);
      }
    };
    getRoomsFromApi(roomType);
  }, [roomType]);

  return (
    <div>
      <h1>Room Type Details: {roomType}</h1>
      {rooms.every((room) => room.booked) ? (
        <p>No rooms available</p>
      ) : (
        <p>Rooms available</p>
      )}
    </div>
  );
}
