const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../../config/auth');
const { Pad } = require('../models/pad');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.JPG' || ext !== '.jpeg' || ext !== '.png') {
      return cb(
        res.status(400).end('only jpg, jpeg and png files are allowed'),
        false
      );
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('padimage');

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
              image: req.body.image,
              booked: 0,
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

//upload pad Image
router.post('/upload', upload, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.filename,
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

//Update Pad Info
router.put('/:id', auth, (req, res) => {
  let { id } = req.params;
  Pad.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((pad) => {
      res.status(200).json({
        message: 'Updated Successfully',
        pad: pad,
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
