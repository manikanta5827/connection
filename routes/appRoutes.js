import express from "express";
import * as authController from '../controller/authController.js';
import * as userController from '../controller/userController.js';
import * as connectionController from '../controller/connectionController.js';
import authHandler from "../middleware/authHandler.js";

const router = express.Router();

// auth routes
router.post('/user/create', authController.createUser);
router.post('/user/login', authController.login);


// user routes
router.get('/profile/:username', userController.getProfile);

// connection routs
router.post('/connection/send', authHandler, connectionController.sendConnectionRequest);
router.patch('/connection/accept', authHandler, connectionController.acceptConnectionRequest);
router.patch('/connection/reject', authHandler, connectionController.rejectConnectionRequest);
router.get('/connections/pending', authHandler, connectionController.getPendingRequests);
router.get('/connections', authHandler, connectionController.getFriendsList);

export default router;