const express = require('express');
const userController = require("../controllers/user.controller");
const router = express.Router();
const authenticate = require("../middleware/authenticate");



router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/signout", userController.signout);
router.get("/profile",authenticate, userController.getProfile);
router.get("/getusers", authenticate, userController.getUsers);

// Route to create a new user (accessible to all)
router.post("/createUser", userController.createUser);

// Route to delete a user by ID (accessible only to admins)
router.delete("/deleteUser/:id", authenticate, userController.deleteUser);



module.exports = router;

