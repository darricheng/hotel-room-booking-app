import React from "react";

import CustomerService from "../assets/customer_service.jpeg";

const Contact = () => {
  return (
    <div className="contact-container">
      <img
        className="contact-bg"
        src={CustomerService}
        width="1920"
        height="1080"
        alt="customer service"
      />
      <h1>Contact Us</h1>
      <p>
        For hotel related matters, please contact our main line at +65 6748 8282
        or email us at hotel82@hotel82.com.sg
      </p>
    </div>
  );
};

export default Contact;
