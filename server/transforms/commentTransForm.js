const Transform = require('./baseTransForm');

module.exports = class CommentTransForm extends Transform {

    transform(item){
        return {
            'description' : item.description,
            'show_date' : item.show_date,
            'author' : item.author,
            ...this.showArticle(item)
        };
    }
    withArticle(){
        this.withArticleStatus = true;
        return this;
    }
    showArticle(item){
        const ArticleTransform = require(`${config.path.transforms}/articleTransForm`);
        if(this.withArticleStatus){
            return {
                article : new ArticleTransform().transform(item.article)
            }
        }
        return {}                                                                                                                
    }
}