const Transform = require('./baseTransForm');
const CategoryTransform = require('./categoryTransForm');
const UserTransform = require('./userTransForm');
const CommentTransform = require('./commentTransForm');

module.exports = class ArticleTransForm extends Transform {

    transform(item){
        return {
            'title' : item.title,
            'content' : item.content,
            'image' : item.image,
            'url' : item.url,
            'show_date' : item.show_date,
            ...this.showCategory(item),
            ...this.showAuthor(item),
            ...this.showAllItem(item)
        };
    }

    collectionName(){
        return 'articles';
    }

    //withCategory
    withCategory(){
        this.withCategoryStatus = true;
        return this;
    }
    showCategory(item){
        const CategoryTransform = require(`${config.path.transforms}/categoryTransForm`);
        if(this.withCategoryStatus){
            return { category : new CategoryTransform().transform(item.category) }
        }
        return {}
    }

    //withAuthor
    withAuthor(){
        this.withAuthorStatus = true;
        return this;
    }
    showAuthor(item){
        const UserTransform = require(`${config.path.transforms}/userTransForm`);
        if(this.withAuthorStatus){
            return { author : new UserTransform().transform(item.author) }
        }
        return {}
    }

    //withAllItem
    withAllItem(){
        this.withAllItemStatus = true;
        return this;
    }
    showAllItem(item){
        if(this.withAllItemStatus){
            return {
                author : new UserTransform().transform(item.author),
                category : new CategoryTransform().transform(item.category),
                comments : new CommentTransform().transformCollection(item.comments)
            }
        }
        return {}
    }
}