// imports modules & dependencies
const express=require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = require('dotenv');
const cors = require('cors');
const path = require('path');

// imports application middleware and routes
const authRoute = require('../routes/auth');
const userRoute = require('../routes/user');
const restaurantRoute = require('../routes/restaurant');
const roomRoute = require('../routes/room');
const bookingRoute = require('../routes/booking');

// load environment variables from .env file
env.config();

// initialize express app
const app = express();

// application database connection establishment
const connectDatabase = require('../database/connect_db');
connectDatabase();

// parse cookies from request
app.use(cookieParser());

app.use(
    cors({
      origin: ["http://localhost:4200", "http://localhost:8473"],
      credentials: true,
    })
  );

// parse body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// sets application API's routes
app.use('/api', authRoute); // auth routes
app.use('/api', userRoute); // user routes
app.use('/api', restaurantRoute)
app.use('/api', roomRoute)
app.use('/api', bookingRoute)

module.exports=app
