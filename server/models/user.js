const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
name : { type : String , required: true },
family : { type : String , required: true },
email : { type:String , required: true , unique: true },
password : { type : String , required : true},
photo : { type : String , default : `http://localhost:${config.port}/public/default/imgUser.png` },
role : { type : String , default : 'user'},
job : { type : String , default : null },
bio : { type : String , default : null },
github : { type : String , default : null },
linkedin : { type : String , default : null },
activeCode : { type : String },
show_date : { type : String },
isActive : { type : Boolean , default: false },
articles : [{ type : Schema.Types.ObjectId , ref : 'Article' }],
comments : [{ type : Schema.Types.ObjectId , ref : 'Comment' }]
});

UserSchema.plugin(timestamps);
UserSchema.pre('save',function(next){
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date =  new Date().getDate();
    let currentDate = `${date}/${month}/${year}`;
    if(!this.show_date)
        this.show_date = currentDate;
    
    bcrypt.hash(this.password, 10,(err, hash) => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User',UserSchema);