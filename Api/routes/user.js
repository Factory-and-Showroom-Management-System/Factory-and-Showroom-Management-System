const express = require('express');
const userController = require("../controllers/user.controller");
const router = express.Router();
const authenticate = require("../middleware/authenticate");



router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/signout", userController.signout);
router.get("/profile",authenticate, userController.getProfile);


module.exports = router;