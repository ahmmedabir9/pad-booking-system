const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const { Booking } = require('../models/booking');

//insert new Shift
router.post('/add-shift', auth, (req, res) => {
  let slug = req.body.shiftname.replace(/\s+/g, '-').toLowerCase();
  Shift.findOne({ slug: slug }).then((shift) => {
    if (shift) {
      res.status(200).json({
        message: 'The shift Name already exists, please choose another name',
      });
    } else {
      let shift = new Shift({
        shiftname: req.body.shiftname,
        slug: slug,
        pad: req.body.pad,
        manager: req.manager._id,
        shiftstart: req.body.shiftstart,
        shiftend: req.body.shiftend,
        rent: req.body.rent,
      });

      shift
        .save()
        .then((result) => {
          res.status(201).json({
            message: 'New Shift Created',
            shift: result,
          });
        })
        .catch((error) => {
          res.json({
            error,
          });
        });
    }
  });
});

//get bookings by manager id
router.post('/', auth, (req, res) => {
  let pad = req.body.slug;

  console.log(`Called from: ${pad}`);

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
    { $set: req.body },
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
  Shift.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: 'Deleted Successfully',
        ...result._doc,
      });
    })
    .catch();
});

module.exports = router;
