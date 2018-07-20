const baseController = require('./../../../baseController');
module.exports = new class CommentController extends baseController{
    list(req,res){
        this.model.Comment.find({},(err,comments)=>{
            if(err) throw err;
            if(comments){
                return res.json({
                    data : comments,
                    isSuccess : true
                });
            }
            return this.showMessage(res,404,'Not found.',false);
        });
    }

    approved(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Category.findByIdAndUpdate(req.params.id,{confirmation : true},(err,comment)=>{
                this.logError(err,res);

                if(comment)
                    return this.showMessage(res,200,'Comment approved.',true);

                return this.showMessage(res,404,'Not found.',false);
            });
        });
    };

    delete(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Comment.findByIdAndRemove(req.params.id,(err,comment)=>{
                if(err) throw err;

                if(comment)
                    return this.showMessage(res,200,'Comment successfully deleted.',true);

                return this.showMessage(res,404,'Not found.',false);
            });
        });
    }
}