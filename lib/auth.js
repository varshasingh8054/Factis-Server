const jwt = require('jsonwebtoken');
const _ = require('underscore');

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }
      resolve(decodedToken)
    });
  });
}

function createJWToken(details) {
  if (typeof details !== 'object') {
    details = {}
  }
  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600
  }
  //var cert = fs.readFileSync('private.key');
  // let token = jwt.sign(details.sessionData, process.env.JWT_SECRET, {
  //   expiresIn: details.maxAge,
  //   algorithm: 'RS256'
  // });
  var token = jwt.sign(details.sessionData, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
    algorithm: 'HS256'
  });
  return token;
}

module.exports = {
  verifyJWTToken,
  createJWToken
}