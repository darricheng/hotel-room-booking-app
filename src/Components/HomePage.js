import { Image } from "antd";
import homePageBanner from "../assets/hotel-home-page-banner.jpg";

export default function HomePage() {
  return (
    <div className="site-homepage-content" style={{ textAlign: "center" }}>
      <Image
        src={homePageBanner}
        alt="hotel-home-page-banner"
        width={"100%"}
        height={"20%"}
        style={{ marginBottom: "24px" }}
        preview={false}
      />
      <h1>Hotel 82</h1>
    </div>
  );
}
