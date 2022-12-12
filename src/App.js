// Ant design imports
import "antd/dist/reset.css";
import { Layout, Menu, theme } from "antd";

// module imports
import { Routes, Route } from "react-router-dom";

// Component imports
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import HotelLogoSvg from "./Components/HotelLogoSvg";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo">
            <HotelLogoSvg sizeMultiplier={1.5} />
          </div>
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
