import fs from 'fs';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const { data, total, page, pages} = res.advancedResults;
  res.status(200).json({
    total,
    page,
    pages,
    products: data,
    
  })
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

  const createdProduct = await Product.create({
    name,
    price,
    user: req.user._id,
    brand,
    image: filePath,
    category,
    countInStock,
    description,
  });

  res.status(201).json(createdProduct);
});

const imageUpload = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  let filePath;
  if(req.file){

    const imagePath = product.image;
    fs.unlinkSync(imagePath.substring(1));

    filePath = "/" + req.file.path.replace(/\\/g, '/');
  }

  if(product){
    product.image = req.file ? filePath : product.image ;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, description, brand, category, countInStock, isFeatured } = req.body;

  console.log(req.body)

  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.isFeatured = isFeatured

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

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

  const { rating, comment} = req.body;

  const product = await Product.findById(req.params.id)

  if(product){
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if(alreadyReviewed){
      res.status(400);
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;


    await product.save();
    res.status(201).json({ message: "Review added"});
  }else{
    res.status(404);
    throw new Error('Resource not found')
  }
})


// @desc GET top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({}).sort({ rating: -1}).limit(3);

  res.status(200).json(products)

})

const getBrandsAndCategories = asyncHandler(async(req, res) => {
  
  const data = await Product.fetchUniqueProductBrandsAndCategories();
  res.status(200).json({...data})
})




export { getAllProducts, getProductById, createProduct,imageUpload, updateProduct, deleteProduct, createProductReview ,getTopProducts, getBrandsAndCategories}