const ErrorResponse = require("../utils/ErrorEesponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    let token; 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]
    
    if(!token)
        throw new ErrorResponse(401, 'Not authorize to access this route');
    // Verify token 
    const decode = jwt.verify(token,  process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    next();

};

exports.authorize = (...roles) => (req, res, next) => {

    if (!roles.includes(req.user.role))
      throw new ErrorResponse(
        403,
        `User role ${req.user.role} is not authorized to access this route`,
      );
    next();
  };