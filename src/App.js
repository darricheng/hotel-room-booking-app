// Ant design imports
import "antd/dist/reset.css";
import { Layout, Menu, theme } from "antd";

// module imports
import { Routes, Route, Link } from "react-router-dom";

// Component imports
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HotelLogoSvg from "./Components/HotelLogoSvg";
import AuthContextProvider from "./firebase/AuthContext";

// Ant Design Layout Components
const { Header, Content, Footer } = Layout;

// List of pages to appear in the navigation bar
// TODO: List out pages to appear in the navigation bar
// const menuItems = [
//   {
//     link: "/",
//     text: "Home",
//   },
//   {
//     link: "/login",
//     text: "Login",
//   },
//   {
//     link: "/sign-up",
//     text: "Sign Up",
//   },
// ];

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <AuthContextProvider>
        <Layout className="layout">
          <Header>
            <Link to="/">
              <HotelLogoSvg sizeMultiplier={1.5} />
            </Link>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
          </Header>
          <Content>
            <div
              className="site-layout-content"
              style={{ background: colorBgContainer }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <p>Copyright © 2022 Darric Heng & Sheikh Mushahid</p>
            <p>All Rights Reserved</p>
          </Footer>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
