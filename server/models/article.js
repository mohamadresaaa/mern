const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ArticleSchema = new Schema({
title : { type : String , required : true , unique : true },
content : { type : String ,  required : true },
image : {type : String , required : true},
show_date : { type : String },
url : { type : String , required : true , unique : true },
author : { type : Schema.Types.ObjectId , ref : 'User' },
category : { type : Schema.Types.ObjectId , ref : 'Category' },
comments : [{ type : Schema.Types.ObjectId , ref : 'Comment' }]
});
ArticleSchema.plugin(timestamps);
ArticleSchema.plugin(mongoosePaginate);

ArticleSchema.pre('save',function(next){
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date =  new Date().getDate();
    let currentDate = `${date}/${month}/${year}`;
    if(!this.show_date)
        this.show_date = currentDate;

    next();
});
module.exports = mongoose.model('Article',ArticleSchema);