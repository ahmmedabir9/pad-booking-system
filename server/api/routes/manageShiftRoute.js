const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const { Shift } = require('../models/shift');

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

//get shifts by manager id
router.get('/', auth, (req, res) => {
  let { _id } = req.manager;

  Shift.find({ manager: _id })
    .sort({ shiftstart: 1 })
    .then((shifts) => {
      if (!shifts) {
        res.status(400).json({
          message: 'No shift Found',
        });
      } else if (shifts) {
        res.status(200).json(shifts);
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
