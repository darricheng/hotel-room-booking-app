import { Typography } from "antd";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "48px 0",
};

export default function BookingConfirmationPage() {
  return (
    <div style={divStyle}>
      <Typography.Title level={1}>Booking Confirmed</Typography.Title>
      <Typography.Paragraph>
        Thank you for choosing us! To view your bookings, visit your profile
        page.
      </Typography.Paragraph>
    </div>
  );
}
