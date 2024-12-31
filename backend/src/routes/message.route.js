import express from 'express';
import { protectRoute } from '../middleware/auth.protectRoute.js';
import { getAllUsersData } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';
import { sendMessage } from '../controllers/message.controller.js';
import { selectUserForChat } from '../controllers/message.controller.js';
import { unselectUserForChat } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/users', protectRoute, getAllUsersData); //to show all users on sidebar

router.get('/:id', protectRoute, getMessages); //get all messages between two users

router.post('/send/:id', protectRoute, sendMessage);

router.put('/select-user-to-chat-with', protectRoute, selectUserForChat);
router.put('/unselect-user-to-chat-with', protectRoute, unselectUserForChat);

export default router;
