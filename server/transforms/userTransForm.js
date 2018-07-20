const Transform = require('./baseTransForm');
const jwt = require('jsonwebtoken');
module.exports = class UserTransForm extends Transform {

    transform(item , createToken = false){
        this.createToken = createToken;
        return{
            'name' : item.name,
            'family' : item.family,
            'email' : item.email,
            'photo' : item.photo,
            ...this.withToken(item)
        };
    };

    withToken(item){
        if(item.token)
            return { token : item.token }

        if(this.createToken){
            let token = jwt.sign({ user_id : item._id } , config.secret , {
                expiresIn : '72h'
            });
            return {token };
        }
        return {};
    }

}