const baseController = require('./../../../baseController');
module.exports = new class CategoryController extends baseController{

    list(req,res){
        this.model.Category.find({},(err,categories) => {
            this.logError(err,res);
            
            if(categories)
                return res.json({
                    data : categories,
                    isSuccess : true
                });

            return this.showMessage(res,404,'Not found.',false);
        });
    };

    create(req,res){
        this.checkBodyNotEmpty(req,'title url'),
        this.escapeAndTrim(req,'title url');
        this.showValidationErrors(req,res).then(() => {
            let category = new this.model.Category({
                title : req.body.title,
                url : req.body.url
            });
            category.save(err =>{
                this.logError(err,res);
                
                return this.showMessage(res,200,'The category was successfully recorded.',true);
            });
        });
    };

    edit(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Category.findByIdAndUpdate(req.params.id,{title : 'cgfdg'},(err,category)=>{
                if(err) throw err;

                if(category){
                   return this.showMessage(res,200,'The category has been successfully edited.',true); 
                }

                return this.showMessage(res,404,'Not found.',false);
            });
        });
    };

    delete(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Category.findByIdAndRemove(req.params.id,(err,category)=>{
                this.logError(err,res);

                if(category)
                    return this.showMessage(res,200,'Category successfully deleted.',true);

                return this.showMessage(res,404,'Not found.',false);
            });
        });
    }
    
};