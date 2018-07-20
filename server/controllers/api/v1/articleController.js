const baseController = require('./../../baseController');
const ArticleTransform = require('./../../../transforms/articleTransForm');

module.exports = new class ArticleController extends baseController{
    list(req,res){
        const page = req.query.page || 1;
        this.model.Article.paginate({},{ page , limit : 4 , populate : ['category','author'] })
        .then(result =>{
            if(result){
                return res.json({
                    data : new ArticleTransform().withPaginate().withCategory().transformCollection(result),
                    isSuccess : true
                });
            }
            else
                return this.showMessage(res,404,'Not found.',false);
        })
        .catch(err => console.log(err));
    };
    details(req,res){
        this.model.Article.findOne({ url : req.params.url })
        .populate('category').populate('author').populate('comments').exec((err,article)=>{
            if(err) throw err;

            if(article){
                return res.json({
                    data : new ArticleTransform().withAllItem().transform(article),
                    isSuccess : true
                });
            }

            return this.showMessage(res,404,'Not found.',false);
        })
    }
    lastArticle(req,res){
        this.model.Article.find({}).populate('category').exec((err,articles)=>{
            if(err) throw err;
            if(articles){
                return res.status(200).json({
                    data : new ArticleTransform().withCategory().transformCollection(articles).slice(-8).reverse(),
                    isSuccess : true
                })
            }
            return this.showMessage(res,404,'Not found.',false);
        });
    }
}