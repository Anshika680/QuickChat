import express from 'express';
import {signup , login} from '../controller/userController.js'
import {protectRoute} from '../Middleware/auth.js'
import { updateProfile } from '../controller/userController.js';
import { checkAuth } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.put('/update-profile', protectRoute , updateProfile)
userRouter.get('/check' , protectRoute,checkAuth)


export default userRouter;
