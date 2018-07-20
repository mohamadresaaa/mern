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
        if(item.hexzm_token)
            return { hexzm_token : item.hexzm_token }

        if(this.createToken){
            let hexzm_token = jwt.sign({ user_id : item._id } , config.secret , {
                expiresIn : '72h'
            });
            return { hexzm_token };
        }
        return {};
    }

}