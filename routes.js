var controller = require('./controllers/controller')
var login_controller = require('./controllers/login_controller')
let express = require('express');
let router = express.Router();



router.get('/', controller.index);

router.post('/addCategory', login_controller.isAuth,controller.addCategory);

router.post('/addUser', controller.addUser);

router.get('/getCategories', login_controller.isAuth,controller.getCategories);

router.get('/getOneCategory/:category_id', login_controller.isAuth,controller.getOneCategory);

router.get('/getUsers', login_controller.isAuth,controller.getUsers);

router.get('/getOneUser/:user_id', login_controller.isAuth,controller.getOneUser);

router.post('/addDepense',login_controller.isAuth,controller.addDepense);

router.get('/getDepenses' ,login_controller.isAuth ,controller.getDepenses);

router.get('/getOneDepense/:depense_id',login_controller.isAuth, controller.getOneDepense);

router.put('/updateDepense/:depense_id',login_controller.isAuth, controller.updateDepense);

router.delete('/deleteDepense/:depense_id',login_controller.isAuth, controller.deleteDepense);

router.put('/updateUser/:user_id',login_controller.isAuth, controller.updateUser);

router.delete('/deleteUser/:user_id',login_controller.isAuth, controller.deleteUser);

router.put('/updateCategory/:category_id',login_controller.isAuth, controller.updateCategory);

router.delete('/deleteCategory/:category_id', login_controller.isAuth, controller.deleteCategory);


router.post('/login', login_controller.login);

// router.get('/publicKey', login_controller.publicKey);



module.exports = router;