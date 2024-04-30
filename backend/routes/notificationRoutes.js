import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getAllNotifications, updateNotiToRead } from '../controllers/notificationController.js';



const router = express.Router()

router.route('/').get(protect, getAllNotifications)

router.route('/read/:id').put(protect, updateNotiToRead)

export default router;