const jwt = require('jsonwebtoken');
const User = require('./../models/user');
module.exports = (req,res,next) => {
    let token = req.body.token || req.query.token || req.headers['access-token'];
    if(token){
        return jwt.verify(token , config.secret , (err,decode) => {
            if(err){
                return res.json({
                    message : 'Failed to authenticate',
                    isSuccess : false
                });
            }
            User.findById(decode.user_id,(err,user) => {
                if(err){
                    return res.status(500).json({
                        message : 'The server is unable to respond. Please try again',
                        isSuccess : false
                    });
                }
                if(user){
                    user.token = token;
                    req.user = user;
                    return next();
                }else{
                    return res.status(404).json({
                        message : 'User not found',
                        isSuccess : false
                    });
                }
            });

        });
    }
    return res.status(403).json({
        message : 'No token provided',
        isSuccess : false
    });
};