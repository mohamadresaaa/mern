const multer =  require('multer');
const mkdrip = require('mkdirp');

const imageFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
};

//Article//
const imgArticleStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let dir = `./public/uploads/articles/${year}/${month}`;
        mkdrip(dir,err => cb(err,dir));
    },
    filename : (req,file,cb) => {
        cb(null, Date.now() +  '-' + file.originalname )
    }
});

const UploadImageArticle = multer({
    storage : imgArticleStorage,
    fileFilter : imageFilter
});

module.exports = { UploadImageArticle };