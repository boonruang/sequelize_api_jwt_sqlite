const JWT = require('jsonwebtoken');
const JwtConfig = require('./Jwt-config');

const checkToken = (req, res, next) => {
  let userToken = req.headers['authorization'];
  JWT.verify(userToken, JwtConfig.secret, (error, data) => {
    if (error) {
      return res.status(500).json({
        result: 'Invalid token'
      });
    } else {
      res.user = data;
      next();
    }
  });
};

module.exports = {
  checkToken: checkToken
};
