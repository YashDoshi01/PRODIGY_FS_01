const router = require("express").Router();
const {signup , login} = require("../controllers/AuthController");
const {signupValidation , LoginValidation} = require("../middlewares/Authvalidation");

router.post('/login' ,LoginValidation , login )
router.post('/signup' ,signupValidation , signup)

module.exports = router;