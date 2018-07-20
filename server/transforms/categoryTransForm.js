const Transform = require('./baseTransForm');

module.exports = class CategoryTransForm extends Transform {

    transform(item){
        return {
            'title' : item.title,
            'url' : item.url,
            ...this.showArticles(item)
        };
    }
    collectionName(){
        return 'categories';
    }
    withArticles(){
        this.withArticlesStatus = true;
        return this;
    }
    showArticles(item){
        const ArticleTransform = require(`${config.path.transforms}/articleTransForm`);
        if(this.withArticlesStatus){
            return{
                articles : new ArticleTransform().transformCollection(item.articles)
            }
        }
        return {}
    }
}