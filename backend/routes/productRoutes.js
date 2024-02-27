import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router()

router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);


export default router;