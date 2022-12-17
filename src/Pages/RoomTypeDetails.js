import { useEffect, useState } from "react";
import { useParams } from "react-router";

// TODO: use dayjs().toDate() to convert the date strings to date objects when calling the book room api

export default function RoomTypeDetails(props) {
  // Get the room search setting from App state
  // setRoomSearchSetting is for setting the single source of truth for the user's selected dates and room type
  const { roomSearchSetting, setRoomSearchSetting } = props;

  // State to store the rooms returned from the api call
  const [rooms, setRooms] = useState([]);

  // Get the room type from the url instead of App state because the user may directly access the room type details page
  const { roomType } = useParams();

  // Set the room type in App state to the room type in the url
  useEffect(() => {
    setRoomSearchSetting({
      ...roomSearchSetting,
      roomType: roomType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomType]); // Only want the effect to run when the room type changes

  useEffect(() => {
    // Function to get the available rooms from the api
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
