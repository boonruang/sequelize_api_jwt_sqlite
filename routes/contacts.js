const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const JwtMiddleware = require('../config/Jwt-Middleware');

//  @route              POST /api/v1/contacts
//  @desc               Register contact
//  @access             Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;

  try {
    const contactFound = await Contact.findOne({
      where: {
        email: email
      }
    });

    if (contactFound) {
      // contact found
      res.status(500).json({
        message: 'contact already exist'
      });
    } else {
      // contact not found
      const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone,
        userId: res.user.id
      });

      if (contact) {
        // contact created
        res.status(200).json({
          message: 'contact created',
          contact
        });
      } else {
        // contact create failed
        res.status(500).json({
          message: 'contact create failed'
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

//  @route              GET /api/v1/contacts
//  @desc               Get all contact
//  @access             Private
router.get('/', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const contactFound = await Contact.findAll({
      where: {
        userId: res.user.id
      }
    });

    if (contactFound) {
      // contact found
      res.status(200).json({
        result: contactFound
      });
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

//  @route              DELETE /api/v1/contacts/:id
//  @desc               Delete contact
//  @access             Private
router.delete('/:id', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const contactFound = await Contact.findOne({
      where: {
        id: req.params.id
      }
    });

    if (contactFound) {
      // contact found
      //make sure user own contact
      if (contactFound.userId === res.user.id) {
        // Delete contact
        const contact = await Contact.destroy({
          where: {
            id: req.params.id
          }
        });

        if (contact) {
          // Deleted successfully
          res.status(200).json({
            result: 'Contact deleted'
          });
        } else {
          // Delete failed
          res.status(500).json({
            result: 'Contact delete failed'
          });
        }
      } else {
        // user not own contact
        res.status(500).json({
          result: 'Contact delete not allow'
        });
      }
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

//  @route              UPDATE /api/v1/contacts/:id
//  @desc               Update contact
//  @access             Private
router.put('/:id', JwtMiddleware.checkToken, async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;

  try {
    const contactFound = await Contact.findOne({
      where: {
        id: req.params.id
      }
    });

    if (contactFound) {
      // contact found
      //make sure user own contact
      if (contactFound.userId === res.user.id) {
        // update contact
        const contact = await Contact.update(
          {
            name: name,
            email: email,
            phone: phone
          },
          {
            where: {
              id: req.params.id
            }
          }
        );

        if (contact) {
          // update successfully
          res.status(200).json({
            result: 'Contact updated'
          });
        } else {
          // update failed
          res.status(500).json({
            result: 'Contact update failed'
          });
        }
      } else {
        // user not own contact
        res.status(500).json({
          result: 'Contact update not allow'
        });
      }
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

module.exports = router;
