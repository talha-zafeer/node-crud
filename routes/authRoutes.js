const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authControllers");

router.get("/signup", authController.signUp);
router.post("/signup", authController.registerUser);
router.get("/login", authController.logIn);
router.post("/login", authController.verifyLogin);
router.get("/logout", authController.logOut);

module.exports = router;
