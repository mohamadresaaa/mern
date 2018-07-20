const Category = require('./../models/category');
const Article = require('./../models/article');
const User = require('./../models/user');
const Comment = require('./../models/comment');
module.exports = class baseController {
    constructor(){
        this.model = { Category , Article , User , Comment }
    };

    showValidationErrors(req,res){
        return new Promise((resolve,reject) => {
            let errors =  req.validationErrors()
            if(errors){
                return res.status(422).json({
                    information : errors.map(error =>{
                        return{
                            'field' : error.param,
                            'message' : error.msg
                        }
                    }),
                    isSuccess : false
                });
                reject();
            }
            resolve();
        });
    };

    checkBodyNotEmpty(req,fields){
        fields.split(' ').forEach(field =>{
            req.checkBody(field,`Please enter the ${field}`).notEmpty();
        });
    };

    escapeAndTrim(req,items){
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    };

    logError(err,res){
        if(err){
            let newError = new LogError({
                code : err.code,
                message : err.msg
            });
            newError.save();

            return res.status(500).json({
                message : 'Sorry, the server is unable to respond.',
                isSuccess : false
            });
        }
    }

    showMessage(res,statusCode,message,isSuccess){
        res.status(statusCode).json({
             message : message,
             isSuccess : isSuccess
        });
     };
};
