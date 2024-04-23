import express from "express";
import{ getUsers, createUser, getUserById, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser , adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();    // Create a new router

router.get('/users',verifyUser,adminOnly, getUsers);    // Get all users
router.post('/users',verifyUser,adminOnly, createUser);    // Create a new user
router.get('/users/:id',verifyUser,adminOnly, getUserById);    // Get a user by id
router.patch('/users/:id',verifyUser,adminOnly, updateUser);    // Update a user by id
router.delete('/users/:id',verifyUser,adminOnly, deleteUser);    // Delete a user by id

export default router;    // Export the router