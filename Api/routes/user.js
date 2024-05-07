const express = require('express');
const userController = require("../controllers/user.controller");
const router = express.Router();


router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/signout", userController.signout);


module.exports = router;