const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

//  @route              POST /api/v1/users
//  @desc               Register user
//  @access             Public
router.post('/', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password);

  try {
    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (userFound) {
      // User found
      res.status(500).json({
        message: 'User already exist'
      });
    } else {
      // User not found
      const user = await User.create({
        name: name,
        email: email,
        password: password
      });

      if (user) {
        // user created
        res.status(200).json({
          message: 'User created',
          user
        });
      } else {
        // user create failed
        res.status(500).json({
          message: 'User create failed',
          user
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

module.exports = router;
