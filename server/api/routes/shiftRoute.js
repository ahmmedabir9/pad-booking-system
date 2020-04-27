const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { Shift } = require('../models/shift');

//get shift by pad
router.get('/:id', (req, res) => {
  Shift.find({ pad: req.params.id })
    .then((shifts) => {
      res.status(200).json(shifts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Error',
        error: err,
      });
    });
});

module.exports = router;
