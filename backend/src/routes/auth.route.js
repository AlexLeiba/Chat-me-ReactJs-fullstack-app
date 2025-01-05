import express from 'express';
import {
  login,
  logout,
  signup,
  updateProfilePicture,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.protectRoute.js';
import { updateProfile } from '../controllers/auth.controller.js';
import { checkAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/logout', protectRoute, logout);

router.post('/signin', login);

router.put('/update-profile-picture', protectRoute, updateProfilePicture);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth);

export default router;
