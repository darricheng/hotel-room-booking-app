import { useEffect } from "react";
import { useParams } from "react-router";

const getRoomsFromApi = async (roomType) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rooms?room_type=${roomType}`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default function RoomTypeDetails() {
  const { roomType } = useParams();
  useEffect(() => {
    getRoomsFromApi(roomType);
  }, [roomType]);

  return (
    <div>
      <h1>Room Type Details: {roomType}</h1>
    </div>
  );
}
