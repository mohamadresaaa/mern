const baseController = require('./../../baseController');
const userTransForm = require('./../../../transforms/userTransForm');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');
module.exports = new class AuthController extends baseController{

    register(req,res){
        this.checkBodyNotEmpty(req,'email password name family');
        req.checkBody('email','Please enter your email correctly.').isEmail();
        req.checkBody('password','The password must be at least 8 characters long.').len(8);
        this.escapeAndTrim(req,'email password name family');
        this.showValidationErrors(req,res).then(() => {
            let User = this.model.User({
                email : req.body.email,
                password : req.body.password,
                name : req.body.name,
                family : req.body.family,
                activeCode : uniqid()
            });
            User.save(err => {
                if(err){
                    console.log(err);
                    if(err.code == 11000){
                        return res.json({
                            information : {
                                field : 'email',
                                message : 'Sorry, there is email in the system.'
                            },
                            isSuccess : false
                        });
                    }
                }
                return this.showMessage(res,200,'کاربر با موفقیت ثبت شد',true);
            });
        });
    };
    login(req,res){
        this.checkBodyNotEmpty(req,'email password');
        req.checkBody('email','Please enter your email correctly.').isEmail();
        this.escapeAndTrim(req,'email password');
        this.showValidationErrors(req,res).then(() => {
            this.model.User.findOne({ email : req.body.email } , (err,user) => {
                if(err) throw err;

                if(!user)
                    return this.showMessage(res,422,'The information entered is not correct.',false);
                
                bcrypt.compare( req.body.password , user.password , (err , status) => {
                    
                    if(! status){
                       return this.showMessage(res,422,'Password entered is not correct.',false);
                    }

                    return res.json({
                        data : new userTransForm().transform(user,true),
                        isSuccess : true
                    });
                });
            });
        });
    };
    activateAccount(req,res){
        this.model.User.findOneAndUpdate(
            { activeCode : req.params.activeCode },
            { activeCode : uniqid() , isActive : true },
            (err,user)=>{
                if(err) throw err;
                if(user)
                    return this.showMessage(res,200,'user is active.',true);
                
                return this.showMessage(res,404,'user not fuond',false);
            })
    };

    
};