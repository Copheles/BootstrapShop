import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, createProductReview, getTopProducts, imageUpload, getBrandsAndCategories } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadImage.js';

const router = express.Router()

router.route('/').get(getAllProducts).post(protect, admin, upload.single('image'),createProduct);
router.route('/image/upload/:id').put(protect, admin, upload.single('image'), imageUpload)
router.route('/top').get(getTopProducts)
router.route('/brandsAndCategories').get(protect, admin, getBrandsAndCategories)

router.route('/:id').get(getProductById).put(protect, admin,updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview)



export default router;