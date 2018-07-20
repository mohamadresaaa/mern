const baseController = require('./../../baseController');
const CategoryTransform = require('./../../../transforms/categoryTransForm');
module.exports = new class CategoryController extends baseController{

    list(req,res){
        this.model.Category.find({},(err,categories)=>{
            this.logError(err,res);
            if(categories)
            {
                return res.json({
                    data : new CategoryTransform().transformCollection(categories),
                    isSuccess : true
                });
            }
            return this.showMessage(res,404,'Not found.',false);
        });
    };
    details(req,res){
        this.model.Category.findOne({ url : req.params.url }).populate('articles').exec((err,category)=>{
            if(err) throw err;

            if(category)
            {
                return res.json({
                    data : new CategoryTransform().withArticles().transform(category),
                    isSuccess : true
                });
            }

            return this.showMessage(res,404,'Not found.',false);
        });
    };
}