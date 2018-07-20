const baseController = require('./../../baseController');

module.exports = new class UserController extends baseController{

    profile(req,res){
        return res.json({
            data : req.user,
            isSuccess : true
        })
    };
    
    index(req,res){
        this.model.User.findOne({ email : req.params.email },(err,user)=>{
            if(err) throw err;
            if(user){
                return res.json({
                    data : user,
                    isSuccess : true
                })
            }
            return this.showMessage(res,404,'Not found.',false);
        })
    }
    edit(req,res){
        
    };
    
}