const router = require('express').Router();
const adminRoter =  require('express').Router();

//Middlewares
const apiAuth = require('./../middlewares/apiAuth');
const authAdmin = require('./../middlewares/authAdmin');
const { UploadImageArticle } = require('./../middlewares/upload');

//Public Route//
const CommentController = require('./../controllers/api/v1/commentController');
const ArticleController = require('./../controllers/api/v1/articleController');
const CategoryController = require('./../controllers/api/v1/categoryController');
const AuthController = require('./../controllers/api/v1/authController');
const UserController = require('./../controllers/api/v1/userController');

//category
router.get('/categories',CategoryController.list.bind(CategoryController));
router.get('/categories/:url',CategoryController.details.bind(CategoryController));

//article
router.get('/articles',ArticleController.list.bind(ArticleController));
router.get('/lastArticle',ArticleController.lastArticle.bind(ArticleController));
router.get('/articles/:url',ArticleController.details.bind(ArticleController));

//show profile user outLogin
router.get('/users/:email',UserController.index.bind(UserController));

//comment
router.post('/comments',apiAuth,CommentController.create.bind(CommentController));

//auth
router.post('/register',AuthController.register.bind(AuthController));
router.put('/activateAccount/:activeCode',AuthController.activateAccount.bind(AuthController));
router.post('/login',AuthController.login.bind(AuthController));
//with login
router.get('/users',apiAuth,UserController.profile.bind(UserController));
router.put('/users/:email',apiAuth,UserController.edit.bind(UserController));
//End Public Route//


//Admin Category Controller//
const AdminCategoryController = require('../controllers/api/v1/admin/categoryController');
adminRoter.get('/categories',apiAuth,authAdmin,AdminCategoryController.list.bind(AdminCategoryController));
adminRoter.post('/categories',AdminCategoryController.create.bind(AdminCategoryController));
adminRoter.put('/categories/:id',AdminCategoryController.edit.bind(AdminCategoryController));
adminRoter.delete('/categories/:id',AdminCategoryController.delete.bind(AdminCategoryController));


//Admin Article Controller//
const AdminArticleController = require('../controllers/api/v1/admin/articleController');
adminRoter.get('/articles',AdminArticleController.list.bind(AdminArticleController));
adminRoter.get('/articles/:id',AdminArticleController.details.bind(AdminArticleController));
adminRoter.post('/articles',apiAuth,UploadImageArticle.single('image'),AdminArticleController.create.bind(AdminArticleController));
adminRoter.put('/articles/:id',AdminArticleController.edit.bind(AdminArticleController));
adminRoter.delete('/articles/:id',AdminArticleController.delete.bind(AdminArticleController));


//Admin Comment Cotroller//
const AdminCommentController = require('../controllers/api/v1/admin/commentController');
adminRoter.get('/comments',AdminCommentController.list.bind(AdminCommentController));
adminRoter.put('/comments/:id',AdminCommentController.approved.bind(AdminCommentController));
adminRoter.delete('/comments/:id',AdminCommentController.delete.bind(AdminCommentController));





router.use('/admin',adminRoter);
module.exports = router;
