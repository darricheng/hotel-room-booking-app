import "antd/dist/reset.css";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            Content
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
