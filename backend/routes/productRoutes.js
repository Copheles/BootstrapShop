import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadImage.js';

const router = express.Router()

router.route('/').get(getAllProducts).post(protect, admin, upload.single('image'),createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image') ,updateProduct).delete(protect, admin, deleteProduct);


export default router;