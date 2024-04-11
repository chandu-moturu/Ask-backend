import express from 'express'
import {login,signup} from '../controllers/auth.js'
import {getAllUsers,updateProfile} from '../controllers/Users.js'
import auth from '../middlewares/auth.js'

const router= express.Router();
// another way 
// router.route('/signup').post(signup).get(getAllUsers)
router.post('/signup',signup);
router.post('/login',login);
router.get('/getAllUsers',auth,getAllUsers)
router.patch('/update/:id',auth,updateProfile)

export default router