import "antd/dist/reset.css";
import { Layout, Menu, theme } from "antd";
import HomePage from "./Components/HomePage";
import HotelLogoSvg from "./assets/hotel-82-logo-white.js";

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
            <HomePage />
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
