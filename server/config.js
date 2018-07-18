const path = require('path');
module.exports = {
    port : 3000 || 1378,
    database : 'mongodb://127.0.0.1:27017/HexzmDb',
    secret : '3rr02ofOMKJ22sjcfwjob6#@UDfd',
    path : {
        apiControllersV1 : path.resolve('./controllers/api/v1'),
        baseController : path.resolve('./controllers/baseController'),
        models : path.resolve('./models'),
        apiRoute : path.resolve('./routes/api'),
        transforms : path.resolve('./transforms'),
        middlewares : path.resolve('./routes/middlewares')
    }
};