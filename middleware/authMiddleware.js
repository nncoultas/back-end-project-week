const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const secret = require('../config');

const authenticate = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization header'
    });
  }
};

module.exports = authenticate;
