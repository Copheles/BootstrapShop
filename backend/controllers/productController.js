import fs from 'fs';
import sharp from 'sharp'
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

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {

  const { name, price,  brand, category, countInStock, description } = req.body;
  const filePath = "/" + req.file.path.replace(/\\/g, '/');

  const product = new Product({
    name,
    price,
    user: req.user._id,
    brand,
    image: filePath,
    category,
    countInStock,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, description, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id)

  

  let filePath;
  if(req.file){
    // Delete the image file from the file system before updating
    const imagePath = product.image;
    fs.unlinkSync(imagePath.substring(1));

    filePath = "/" + req.file.path.replace(/\\/g, '/');
  }
  


  if(product){
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = req.file ? filePath : product.image ;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)

  // Delete the image file from the file system
  const imagePath = product.image;
  fs.unlinkSync(imagePath.substring(1));

  if(product){

    await Product.deleteOne({ _id: product._id})
    res.status(200).json({ message: "Product deleted!"});
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
})



export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }