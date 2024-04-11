import express from 'express';
import auth from '../middlewares/auth.js';
import {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup} from '../controllers/Chat.js'

const router = express.Router();

router.route('/').post(auth,accessChat);
router.route('/').get(auth,fetchChats);
router.route('/group').post(auth,createGroupChat);
router.route('/group_rename').put(auth,renameGroup);
router.route('/group_remove').put(auth,removeFromGroup);
router.route('/group_add').put(auth,addToGroup);

export default router;