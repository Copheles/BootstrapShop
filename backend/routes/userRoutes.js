import express from 'express';
import { authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  getUserNotiCount,
  updateUser } from '../controllers/userController.js';
import { protect,
  admin} from '../middleware/authMiddleware.js'
import advancedFilter from '../middleware/advancedFilter.js';
import User from '../models/userModel.js';

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, advancedFilter(User), getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/notiCount/:id').get(protect, getUserNotiCount)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin,getUserByID).put(protect, admin,updateUser)



export default router;