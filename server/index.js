const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
var cors = require('cors');

const config = require('./config/database');

const app = express();

app.use(cors());

//Connection to DB
mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected');
  });

var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
require('./passport')(passport);

const managerRoute = require('./api/routes/managerRoute');
const padRoute = require('./api/routes/padRoute');
const shiftRoute = require('./api/routes/shiftRoute');
const bookingRoute = require('./api/routes/bookingRoute');
const managePadRoute = require('./api/routes/managePadRoute');
const manageShiftRoute = require('./api/routes/manageShiftRoute');
const manageBookingRoute = require('./api/routes/manageBookingRoute');

app.use('/api/managers', managerRoute);
app.use('/api/pads', padRoute);
app.use('/api/shifts', shiftRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/managepad', managePadRoute);
app.use('/api/manageshift', manageShiftRoute);
app.use('/api/managebooking', manageBookingRoute);

app.get('/', (req, res) => {
  res.send('<div><h1>The Server is Running</h1></div>');
});

app.listen(5000);
