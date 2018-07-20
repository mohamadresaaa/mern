const baseController = require('./../../baseController');

module.exports = new class CommentController extends baseController{

    create(req,res){
        this.checkBodyNotEmpty(req,'description'),
        this.escapeAndTrim(req,'description');

        this.showValidationErrors(req,res).then(() => {

            let article = this.model.Article.findOne({ title : req.body.article },(err,article) => {
                if(err) throw err.message;

                let comment = new this.model.Comment({
                    description : req.body.description,
                    confirmation : false,
                    articleId : article._id,
                    author : req.user._id
                });
                comment.save(err =>{
                    if(err) throw err;

                    article.comments.push(comment._id);
                    article.save();
                    req.user.comments.push(comment._id);
                    req.user.save();
                    return this.showMessage(res,200,'The comment was successfully recorded.',true);
                });
            });
        });
    };

}