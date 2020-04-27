const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const jwt = require('jsonwebtoken');

const { Manager } = require('../models/manager');
const { Pad } = require('../models/pad');

router.get('/auth', (req, res) => {
  res.status(200).json({
    _id: req.manager._id,
    email: req.manager.email,
    username: req.manager.name,
  });
});

//register new manager
router.post('/register', (req, res, next) => {
  let manager = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  let validate = registerValidator(manager);

  if (!validate.isValid) {
    res.status(400).json(validate.error);
  } else {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    Manager.findOne({ email })
      .then((manager) => {
        if (manager) {
          return res.status(400).json({
            message: 'Email Already Exist',
          });
        } else {
          bcrypt.hash(password, 9, (err, hash) => {
            if (err) {
              return res.status(500).json({
                message: 'Hash Server Error Occured',
              });
            }
            let manager = new Manager({
              username,
              email,
              password: hash,
            });

            manager
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'manager Created',
                  registerSuccess: true,
                  manager: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'DB Server Error Occured',
        });
      });
  }
});

//login
router.post('/login', (req, res, next) => {
  console.log(req.user);

  let email = req.body.email;
  let password = req.body.password;

  let validate = loginValidator({ email, password });

  if (!validate.isValid) {
    return res.status(400).json(validate.error);
  }

  //find email
  Manager.findOne({ email })
    .then((manager) => {
      if (manager) {
        bcrypt.compare(password, manager.password, (err, result) => {
          if (err) {
            res.status(500).json({
              message: 'Error Occured',
            });
          }

          if (result) {
            let token = jwt.sign(
              {
                _id: manager._id,
                username: manager.username,
                email: manager.email,
              },
              'SECRET',
              { expiresIn: '6h' }
            );

            res.status(200).json({
              message: 'Login Success',
              token: `Bearer ${token}`,
            });
          } else {
            res.status(400).json({
              message: 'Password Wrong',
            });
          }
        });
      } else {
        res.status(400).json({
          message: 'Manager not Found',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server Error Occured',
      });
    });
});

router.get('/logout', (req, res) => {
  Manager.findOneAndUpdate(
    { _id: req.manager._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
