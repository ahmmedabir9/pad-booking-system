const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { Pad } = require('../models/pad');

//get all pad
router.get('/', (req, res, next) => {
  Pad.find()
    .then((pads) => {
      res.status(200).json(pads);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Error',
        error: err,
      });
    });
});

//get pad by id
router.get('/:slug', (req, res) => {
  Pad.findOne({ slug: req.params.slug })
    .then((pad) => {
      res.status(200).json(pad);
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
