const jwtToken = require('../lib/auth');

exports.verifyJWT_MW = function (req, res, next) {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    jwtToken.verifyJWTToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        console.log("valid token provided");
        next();
      })
      .catch((err) => {
        req.user = undefined;
        console.log("Invalid auth token provided.");
        res.send({ message: "Invalid auth token provided." });
      })
  } else {
    req.user = undefined;
    console.log("auth token type missing");
    res.send({ message: "Auth token type missing." });
  }

}