const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController")
const userController = require("../controllers/userController")
const postController = require("../controllers/PostController")

const UserValidation = require("../validations/user/userValidation")
const RegisterUserValidation = require("../validations/user/registerUserValidation")
const LoginUserValidation = require("../validations/user/loginUserValidation")
const UpdateUserValidation = require("../validations/user/updateUserValidation")

const PostValidation = require("../validations/post/postValidation")
const CreatePostValidation = require("../validations/post/createPostValidation")

const SessionService = require("../services/session")
const UserServices = require("../services/userServices")


router.get("/install",postController.install)

router.get("/",postController.home);
router.get("/post/get/:postId",postController.blogDetail);

router.get("/post/create",SessionService.isLogin,postController.createPostView)
router.post("/post/create",SessionService.isLogin,CreatePostValidation.createPostRules(),PostValidation.validate,postController.createPost)

router.get("/register", loginController.registerView);
router.post("/register", RegisterUserValidation.registerUserRules(),UserValidation.validate,UserServices.isUserExist, loginController.registerUser)


router.get("/login", loginController.loginView);
router.post("/login",LoginUserValidation.loginUserRules(),UserValidation.validate, loginController.loginUser);

router.get("/logout",loginController.logoutUser)


router.get("/profile",SessionService.isLogin, userController.profile);
router.post("/profileUpdate",SessionService.isLogin,UpdateUserValidation.updateUserRules(),UserValidation.validate, userController.profileUpdate)


module.exports = router;
module.exports = router;
