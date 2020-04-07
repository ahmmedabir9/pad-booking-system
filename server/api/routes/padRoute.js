const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { Pad } = require("../models/pad");

//get all pad
router.get("/", (req, res, next) => {
  Pad.find()  
    .then(pads => {
      res.status(200).json(pads);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error",
        error: err
      });
    });
});

//insert new Pad
router.post("/add-pad", (req, res, next) => {
  let pad = new Pad({
    padname: req.body.padname,
    padmobile: req.body.padmobile,
    padaddress: req.body.padaddress,
    area: req.body.area,
    district: req.body.district
  });

  pad
    .save()
    .then(result => {
      res.status(201).json({
        message: "Pad Created",
        pad: result
      });
    })
    .catch(error => {
      res.json({
        error
      });
    });
});


//get pad by id
router.get("/:id", (req, res) => {

  var type = req.query.type
  var id = req.query.id;

  Pad.findOne({ _id: req.params.id })
    .then(pad => {
      res.status(200).json(pad);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error",
        error: err
      });
    });
});





module.exports = router;
