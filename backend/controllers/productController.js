import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products)
})

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if(product){
    res.json(product)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }

})

export { getAllProducts, getProductById }