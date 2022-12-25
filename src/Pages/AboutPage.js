import React from "react";

import AboutUsBackground from "../assets/about_us.jpg";

import StaffImage from "../assets/staff_right.jpeg";
import FacilitiesImage from "../assets/facilities_left.jpeg";
import MRTImage from "../assets/mrt_right.jpeg";
import MarinaImage from "../assets/marina_left.jpeg";
import MapImage from "../assets/map_right.jpeg";
import AccessibilityImage from "../assets/accessibility_left.jpeg";

const About = () => {
  return (
    <div>
      <div>
        <img
          className="about-bg"
          src={AboutUsBackground}
          alt="About Hotel 82"
          width="1920"
          height="1080"
        />
        <span className="stay">Stay</span>
        <span className="awhile">Awhile</span>
        <span className="offer">Limited Time Offer: 12% Off!</span>
      </div>
      <div style={{ height: "80px", width: "100%", background: "black" }}></div>
      <div className="features-container">
        <div className="features">
          <img
            src={AccessibilityImage}
            alt="accessibility"
            width="960"
            height="1080"
          />
          <p>
            Accessibility and affordability, are two main qualities of Hotel 82.
            We are a chain of value hotels catering to both leisure and business
            travellers.
          </p>
        </div>
        <div className="features">
          <p>
            With 23 hotels under our management, and locations around the east,
            north-east and central of Singapore, one can easily get around the
            city within 15mins via public transport.
          </p>
          <img src={MapImage} alt="accessibility" width="960" height="1080" />
        </div>
        <div className="features">
          <img
            src={MarinaImage}
            alt="accessibility"
            width="960"
            height="1080"
          />
          <p>
            Some of our hotels are located near to attractions and malls such as
            Gardens by the Bay, Singapore National Museum, Kampong Glam, Funan
            Digital Life Mall, Suntec City Mall, Mustafa Shopping Centre as well
            as Orchard Road, the retail and entertainment hub of Singapore.
          </p>
        </div>
        <div className="features">
          <p>
            All our hotels are accessible to eateries, Mass Rapid Transit (MRT)
            and bus-stops. Soak into the local culture, hop onto a bus or train,
            and dine at the nearest coffeeshop or food centres; shop at the city
            or the shopping malls in the suburbs. Being avid travellers
            ourselves, we believe in making the most out of every trip we take.
          </p>
          <img src={MRTImage} alt="accessibility" width="960" height="1080" />
        </div>
        <div className="features">
          <img
            src={FacilitiesImage}
            alt="accessibility"
            width="960"
            height="1080"
          />
          <p>
            Hotel 82 offers both comfort and value for cost-conscious
            travellers. All our guestrooms are air-conditioned with attached
            bathroom, cabled TV, hot beverage-making facility with complimentary
            drinks and telephone. Complimentary high-speed Wi-Fi available for
            hotel guest.
          </p>
        </div>
        <div className="features">
          <p>
            Our staff are trained to ensure that your needs are well taken care
            of. Our friendly receptionists will always be on hand to direct you
            to various places of interest or render any assistance round the
            clock. Search for a Hotel 82 property that is best suited for your
            holiday or business needs.
          </p>
          <img src={StaffImage} alt="accessibility" width="960" height="1080" />
        </div>
      </div>
    </div>
  );
};

export default About;
