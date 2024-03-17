import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadImage.js';

const router = express.Router()

router.route('/').get(getAllProducts).post(protect, admin, upload.single('image'),createProduct);
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image') ,updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview)



export default router;