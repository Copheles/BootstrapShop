import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, createProductReview, getTopProducts, imageUpload, getBrandsAndCategories, getFeaturedProduct, getMaxPrice } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadImage.js';
import advancedFilter from '../middleware/advancedFilter.js';
import Product from '../models/productModel.js';

const router = express.Router()

router.route('/').get(advancedFilter(Product), getAllProducts).post(protect, admin, upload.single('image'),createProduct);
router.route('/getMaxPrice').get(getMaxPrice)
router.route('/image/upload/:id').put(protect, admin, upload.single('image'), imageUpload)
router.route('/top').get(getTopProducts)
router.route('/brandsAndCategories').get( getBrandsAndCategories)
router.route('/getFeaturedProduct').get(getFeaturedProduct)
router.route('/:id').get(getProductById).put(protect, admin,updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview)



export default router;