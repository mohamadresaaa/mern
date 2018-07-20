module.exports = class baseTransForms{
    transformCollection(items){
        if(this.withPaginateStatus){
            return { 
                [this.collectionName()] : items.docs.map(this.transform.bind(this)),
                ...this.showPaginate(items)
            }
        }
        return items.map(this.transform.bind(this))
    };

    collectionName(){
        return 'items';
    }

    //with paginate
    withPaginate(){
        this.withPaginateStatus = true;
        return this;
    }
    showPaginate(items){
        return {
            total : items.total,
            limit : items.limit,
            page : parseInt(items.page),
            pages : items.pages
        }
    }
};