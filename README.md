# Book a stay at Hotel 82

This app mimics the functionality of a hotel booking app — it allows users to book a room at a fictional Hotel 82. Users can search for room availability based on the intended check-in and check-out dates, and the app will allow them to book a room if one is available. The app also allows users to view their booking history in their profile page.

The app is built using the MERN stack (MongoDB, Express, React, Node.js). It was completed as part of a software engineering course. The backend repository can be found [here](https://github.com/darricheng/mern-stack-backend).

- Frontend is hosted on Vercel; built using React, Ant Design, and Firebase
- Backend is hosted on Cyclic.sh; built using Node.js, Express, mongoose, and MongoDB

[Access a working version of the app](https://hotel-room-booking-app.vercel.app/)

## Features

Users can:

- Create an account
- Log in
- Search for room availability based on check-in and check-out dates
- Book a room if one is available
- View their booking history

## Technologies Used

**Frontend:**

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [Ant Design](https://ant.design/)
- [Firebase](https://firebase.google.com/)

**Backend:**

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)

**Database:**

- [MongoDB](https://www.mongodb.com/)

## Installation

All the necessary libraries needed for the web application to run are found in the package.json file provided. Install them using `npm install` if you are using node package manager.

## Running the App

**Frontend:**

To run the app locally, run `npm start` in the terminal. The app will be available at `localhost:3000`.

Necessary environment variables are:

- `REACT_APP_API_URL`: suggest setting it to `http://localhost:PORT/api`, where `PORT` is the port on which your backend app is listening for requests. If you are hosting the backend on a different URL, make sure to include the `/api` at the end of the URL.

**Backend:**

To run the backend locally, run `npm run dev` in the terminal. The backend will be available at `localhost:PORT`, where `PORT` is an environment variable.

Necessary environment variables are:

- `PORT`: the port at which your app listens for requests, e.g. `8080`.
- `MONGO_URL`: the URL to your MongoDB database, e.g. `mongodb://localhost:27017/hotel-booking`.
- `CORS_ORIGIN = http://localhost:3000`: for allowing cross-origin requests to go through (set to the frontend URL if you are hosting the frontend on a different URL).

## Areas for Improvement

- Add loading spinners while the app is fetching data from the backend
- Add a payment method, such as Stripe, to allow users to pay for their bookings
- Allow users to cancel their bookings
- Add a function that runs every day to check for expired bookings and delete them from the database
- Add an admin dashboard that can modify available rooms, edit all bookings, and manage users.
