const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const CategorySchema = new Schema({
title : { type : String , required : true , unique : true },
url : { type : String , required : true , unique : true },
show_date : { type : String },
user : { type : Schema.Types.ObjectId , ref : 'User' },
articles : [{ type : Schema.Types.ObjectId , ref : 'Article' }]
});
CategorySchema.plugin(timestamps);
CategorySchema.pre('save',function(next){
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date =  new Date().getDate();
    let currentDate = `${date}/${month}/${year}`;
    if(!this.show_date) 
        this.show_date = currentDate;

    next();
});
module.exports = mongoose.model('Category',CategorySchema);