const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = {

  passwordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  passwordCompare(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
  },

  generateToken(payload) {
    const expiresIn = typeof payload.expiresIn !== "undefined" ? payload.expiresIn : 864000;
    const token = jwt.sign({
      user_id: payload.user_id
    },
    process.env.JWT_SECRET, { expiresIn });
    return token;
  },

  checkToken(req, res, next) {
    const token = req.headers['authorization'] || req.body['x-access-token'] || null;
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    }
    const splitToken = token.replace(/^Bearer\s/, '')
    jwt.verify(splitToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'Failed to authenticate User',
        });
      }
      req.user_id = decoded.user_id || null;
      next();
      return true;
    });
    return true;
  }
};

module.exports = auth;