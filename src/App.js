// Ant design imports
import "antd/dist/reset.css";
import { Layout, Menu } from "antd";

// module imports
import { Routes, Route, Link } from "react-router-dom";
import dayjs from "dayjs";

// Component imports
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HotelLogoSvg from "./Components/HotelLogoSvg";

// React imports
import { useContext, useEffect, useState } from "react";

// Authentication imports
import { signOut } from "firebase/auth";
import { AuthContext } from "./firebase/AuthContext";
import { auth } from "./firebase/firebaseConfig";

// Ant Design Layout Components
const { Header, Content, Footer } = Layout;

// dayjs init
dayjs().format();

function App() {
  // Check if the user is logged in
  const { user } = useContext(AuthContext);

  // Handle the click event and selected display for the menu items
  const [currentPage, setCurrentPage] = useState("Home");

  const onMenuItemClick = (e) => {
    console.log(e);
    // If user clicks on the logout link, log them out
    if (e.key === "Logout") {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("User signed out successfully");
        })
        .catch((error) => {
          // An error happened.
          console.error("Error signing out user: ", error);
        });
    }
    // If user clicks on the logo, manually set the key to "Home"
    if (!e.key) {
      e.key = "Home"; // Must be the same as the key of the Home menu item
    }
    // Set the current page to the key of the menu item that was clicked
    setCurrentPage(e.key);
  };

  // List of pages to appear in the navigation bar
  // Conditional elements are used to show/hide certain page links depending on whether the user is logged in or not
  // See: https://stackoverflow.com/a/47771259
  // TODO: Add other pages to the nav bar, such as about us, contact us, etc.
  const menuItems = [
    // Links that will be shown regardless of whether the user is logged in or not
    {
      label: <Link to="/">Home</Link>,
      key: "Home",
    },
    // If user is logged in, show the logout link
    ...(user
      ? [
          {
            label: <Link>Logout</Link>,
            key: "Logout",
          },
        ]
      : []),
    // If user is not logged in, show the login and sign up links
    ...(!user
      ? [
          {
            label: <Link to="/login">Login</Link>,
            key: "Login",
          },
          {
            label: <Link to="/signup">Sign Up</Link>,
            key: "Sign Up",
          },
        ]
      : []),
  ];

  // State management for the room search functionality
  // Initialise a default date range with the current date and the next day.
  const defaultRoomSearchSetting = {
    startDate: dayjs().toDate(),
    endDate: dayjs().add(1, "day").toDate(),
    roomType: "Single Room",
  };
  const [roomSearchSetting, setroomSearchSetting] = useState(
    defaultRoomSearchSetting
  );

  // Function to handle the room search functionality
  const handleRoomSearch = () => {
    console.log(`handleRoomSearch:`, roomSearchSetting);
  };

  return (
    <>
      <Layout className="layout">
        <Header>
          <Link to="/" style={{ float: "left" }} onClick={onMenuItemClick}>
            <HotelLogoSvg sizeMultiplier={1.5} />
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ justifyContent: "flex-end" }}
            items={menuItems}
            onClick={onMenuItemClick}
            selectedKeys={[currentPage]}
          />
        </Header>
        <Content>
          <div className="site-layout-content">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    setroomSearchSetting={setroomSearchSetting}
                    handleRoomSearch={handleRoomSearch}
                  />
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <p>Copyright © 2022 Darric Heng & Sheikh Mushahid</p>
          <p>All Rights Reserved</p>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
