const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY, JWT_REFRESH_TOKEN_SECRET_KEY } = require('../config/envfile');

// Middleware for detecting authenticated logged-in user
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    // get access token form authorization headers
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json({ message: 'Authorization headers are required with Bearer token' });
    }
    // split token from authorization header
    const token = authorization.split(' ')[1];

    // verify token
    jwt.verify(token, JWT_SECRET_KEY, async (err, dec) => {
      if (err) {
        return res.status(401).json({ message: 'JWT token is expired or invalid. Please logout and login again' })
      }

      // check if user exists
      const user = await User.findById(dec.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found with the provided token' })
      }

      // check if user is logged in
      if (user.status === 'login') {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized access. Please login to continue' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// Middleware for validating refresh token
exports.isRefreshTokenValid = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Authorization headers are required with Bearer token' });
    }

    const token = authorization.split(' ')[1];

    // Verify refresh token
    jwt.verify(token, JWT_REFRESH_TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'JWT refresh token is expired or invalid. Please logout and login again' });
      }

      // Check if user exists
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found with the provided token' });
      }

      req.user = user;  
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};
