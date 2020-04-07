const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

const managerRoute = require('./api/routes/managerRoute');
const padRoute = require('./api/routes/padRoute');
const shiftRoute = require('./api/routes/shiftRoute');

app.use('/api/managers', managerRoute);
app.use('/api/pads', padRoute);
app.use('/api/shifts', shiftRoute);

app.get('/', (req, res) => {
  res.send('<div><h1>The Server is Running</h1></div>');
});

app.listen(5000);
