const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const { Pad } = require('../models/pad');

//insert new Pad
router.post('/add-pad', auth, (req, res, next) => {
  Pad.findOne({ manager: req.manager._id })
    .then((pad) => {
      if (pad) {
        res.status(400).json({
          message: 'You have already a pad exist',
        });
      } else {
        let slug = req.body.padname.replace(/\s+/g, '-').toLowerCase();
        Pad.findOne({ slug: slug }).then((pad) => {
          if (pad) {
            res.status(200).json({
              message:
                'The Pad Name already exists, please choose another name',
            });
          } else {
            let pad = new Pad({
              padname: req.body.padname,
              slug: slug,
              padmobile: req.body.padmobile,
              padaddress: req.body.padaddress,
              area: req.body.area,
              district: req.body.district,
              manager: req.manager._id,
              adpay: parseInt(req.body.adpay),
            });

            pad
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'Pad Created',
                  pad: result,
                });
              })
              .catch((error) => {
                res.json({
                  error,
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.json({
        error,
      });
    });
});

//get pad by manager id
router.get('/', auth, (req, res) => {
  let { _id } = req.manager;
  Pad.findOne({ manager: _id })
    .then((pad) => {
      if (!pad) {
        res.status(200).json({
          message: 'No Pad Found',
        });
      } else if (pad) {
        res.status(200).json(pad);
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

router.put('/:id', auth, (req, res) => {
  let { id } = req.params;
  Pad.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((pad) => {
      res.status(200).json({
        message: 'Updated Successfully',
        ...pad._doc,
      });
    })
    .catch((error) => {
      res.json({
        error,
      });
    });
});

router.delete('/:id', auth, (req, res) => {
  let { id } = req.params;
  Pad.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: 'Deleted Successfully',
        ...result._doc,
      });
    })
    .catch();
});

module.exports = router;
