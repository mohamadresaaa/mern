const jwt = require('jsonwebtoken');
const User = require('./../models/user');
module.exports = (req,res,next) => {
    if(req.user.role == 'admin')
        return next();
    return res.status(403).json({
        message : 'Access denied',
        isSuccess : false
    });
}