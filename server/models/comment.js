const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const CommentSchema = new Schema({
    description : { type : String , required : true},
    confirmation : { type : Boolean},
    show_date : {type : String},
    author : { type : Schema.Types.ObjectId , ref : 'User' },
    articleId : { type : Schema.Types.ObjectId , ref : 'Article' }
});

CommentSchema.plugin(timestamps);
CommentSchema.pre('save',function(next){
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date =  new Date().getDate();
    let currentDate = `${date}/${month}/${year}`;
    if(!this.show_date) 
        this.show_date = currentDate;

    next();
});

module.exports = mongoose.model('Comment',CommentSchema);