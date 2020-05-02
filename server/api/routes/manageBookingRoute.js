const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const { Booking } = require('../models/booking');

//get bookings by manager id
router.post('/', auth, (req, res) => {
  let pad = req.body.slug;
  Booking.find({ pad: pad })
    .then((bookings) => {
      if (!bookings) {
        res.status(400).json({
          message: 'You Have No Booking',
        });
      } else if (bookings) {
        res.status(200).json(bookings);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Error',
        error: err,
      });
    });
});

router.put('/:bookingid', auth, (req, res) => {
  let { bookingid } = req.params;
  Booking.findOneAndUpdate(
    { _id: bookingid },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Booking Info Updated',
        Booking: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete('/:id', auth, (req, res) => {
  let { id } = req.params;
  Booking.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: 'Deleted Successfully',
        ...result._doc,
      });
    })
    .catch();
});

module.exports = router;
