const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { Booking } = require('../models/booking');
const { Pad } = require('../models/pad');
const { Shift } = require('../models/shift');

//insert new shift
router.post('/add-booking', (req, res, next) => {
  Booking.findOne({
    shift: req.body.shift,
    date: req.body.date,
    pad: req.body.pad,
  })
    .then((booking) => {
      if (booking) {
        res.status(200).json({
          message: 'This Shift is not available',
        });
      } else {
        let bookingId = `${req.body.shift.slug.replace(
          '-',
          ''
        )}${req.body.date.replace(/\//g, '')}`;

        Pad.findOne({
          slug: req.body.pad,
        }).then((res) => {
          Pad.findOneAndUpdate(
            {
              slug: req.body.pad,
            },
            { $set: { booked: res.booked + 1 } },
            { new: true }
          ).then();
        });

        let booking = new Booking({
          bandname: req.body.bandname,
          bandmobile: req.body.bandmobile,
          bandmail: req.body.bandmail,
          bookingid: bookingId,
          pad: req.body.pad,
          date: req.body.date,
          shift: req.body.shift,
          paid: 0,
          message: req.body.message,
          status: 0,
        });
        booking
          .save()
          .then((result) => {
            res.status(201).json({
              message: 'Booking done',
              booking: result,
            });
          })
          .catch((error) => {
            res.json({
              error,
            });
          });
      }
    })
    .catch((error) => {
      res.json({
        error,
      });
    });
});

//get booking by bookingid
router.post('/', (req, res) => {
  let { bookingid } = req.body;
  Booking.findOne({ bookingid: bookingid })
    .then((booking) => {
      if (booking) {
        res.status(200).json(booking);
      } else {
        res.status(400).json({
          message: 'Invalid Booking ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Server Error',
        error: err,
      });
    });
});

module.exports = router;
