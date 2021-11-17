const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const JwtConfig = require('../config/Jwt-config');
const router = express.Router();
const User = require('../models/User');
const JwtMiddleware = require('../config/Jwt-Middleware');

//  @route              POST /api/v1/auth
//  @desc               Login & get token
//  @access             Public
router.post('/', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (userFound) {
      // User found
      if (bcrypt.compareSync(password, userFound.password)) {
        // password match
        // Sign token
        let userToken = JWT.sign(
          {
            id: userFound.id,
            email: userFound.email
          },
          JwtConfig.secret,
          {
            expiresIn: JwtConfig.expiresIn,
            notBefore: JwtConfig.notBefore
          }
        );
        res.status(200).json({
          message: 'User logged in',
          token: userToken
        });
      } else {
        res.status(500).json({
          message: 'Incorrect username/password'
        });
      }
    } else {
      // User not found
      res.status(500).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

//  @route              GET /api/v1/auth
//  @desc               Authorization
//  @access             Public
router.get('/', JwtMiddleware.checkToken, (req, res) => {
  res.status(200).json({
    result: 'Authorized',
    id: res.user.id,
    email: res.user.email
  });
});

module.exports = router;
