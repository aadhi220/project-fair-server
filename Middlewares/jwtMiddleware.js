const jwt = require("jsonwebtoken");
const jwtMiddleware = (req, res, next) => {
  console.log("inside jwtmiddleware");
  const token = req.headers["authorization"].split(" ")[1];
 try {
    const jwtResponce = jwt.verify(token, "harmanloki123");
    req.payload = jwtResponce.userId;
    next();
 } catch (err) {
    res.status(401).json("Authorisation failed !! Please login..")
 }
};

module.exports = jwtMiddleware;
