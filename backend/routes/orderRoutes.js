import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders } from '../controllers/orderController.js';
import { protect,
  admin} from '../middleware/authMiddleware.js';
import advancedFilter from '../middleware/advancedFilter.js';
import Order from '../models/orderModel.js';


const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, advancedFilter(Order, { path: 'user' }, ['_id', 'name', 'email']), getOrders);

router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router;