const baseController = require('./../../../baseController');
const path = require('path');
const fs = require('fs');
module.exports = new class ArticleController extends baseController{
    list(req,res){
        this.model.Article.find({},(err,articles) => {
            if(err) throw err.message;

            if(articles){
                return res.json({
                    data : articles,
                    isSuccess : true
                });
            }
            return this.showMessage(res,404,'Not found.',false);
        });
    };
    details(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Article.findById(req.params.id,(err,article) => {
                if(err) throw err.message;

                if(article){
                    return res.json({
                        data : article,
                        isSuccess : true
                    });
                }
                return this.showMessage(res,404,'Not found.',false);
            });
        });
    };

    create(req,res){
        if(!req.file){
            this.checkBodyNotEmpty(req,'image');
        }
        this.checkBodyNotEmpty(req,'title content category url');
        this.escapeAndTrim(req,'title image');
        this.showValidationErrors(req,res).then(() => {
            let category = this.model.Category.findById(req.body.category,(err,category) => {
                if(err) throw err.message;

                if(!category)
                    return this.showMessage(res,404,'Not found.',false);
                
                let article = new this.model.Article({
                    title : req.body.title,
                    content : req.body.content,
                    url : req.body.url,
                    image : `http://localhost:${config.port}/` + req.file.path.replace(/\\/g , '/'),
                    category : category._id,
                    author : req.user._id
                    });
    
                article.save(err =>{
                    if(err) throw err.message;
                        
                    category.articles.push(article._id);
                    category.save();
                    req.user.articles.push(article._id);
                    req.user.save();
    
                    return this.showMessage(res,200,'The article was successfully recorded.',true);
                });
            });
        });
    };

    edit(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Article.findByIdAndUpdate(req.params.id,{title : 'Article Two'},(err,article)=>{
                console.log(err);
                if(err){
                    return res.json(err);
                }

                if(article)
                    return this.showMessage(res,200,'The article was edited successfully.',true);

                return this.showMessage(res,404,'Not found.',false);
            });
        });
    };

    delete(req,res){
        req.checkParams('id','The entered ID is not correct.').isMongoId();
        this.showValidationErrors(req,res).then(() => {
            this.model.Article.findById(req.params.id).populate('category').exec((err,article)=>{
                if(err) throw err.message;

                if(article){
                    let imagePath = article.image.replace(`http://localhost:${config.port}/` , '.');
                    fs.unlinkSync(path.resolve(imagePath));
                    let category =  article.category;
                    let pos = category.articles.indexOf(article._id);
                    category.articles.splice(pos,1);

                    category.save(err =>{
                        if(err) throw err.message;
                        article.remove();

                        return this.showMessage(res,200,'The article was successfully deleted.',true);
                    });
                    return;
                }
                return this.showMessage(res,404,'Not found.',false);
            });
        });
    }
}