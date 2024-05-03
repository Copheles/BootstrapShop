import fs from 'fs';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import Notification from '../models/notificationModel.js';
import { io } from '../socket/socket.js';
import User from './../models/userModel.js';

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

  const { name, price, description, brand, category, countInStock, isFeatured, discountPercent } = req.body;

  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.isFeatured = isFeatured
    product.discountPercent = discountPercent

    const updatedProduct = await product.save();
    if(discountPercent > 0){
      const allUsers = await User.find({ _id: { $ne: req.user._id } }, '_id');


      const notifications = allUsers.map(user => {
        return new Notification({
          userId: user._id,
          type: "product",
          notiType: "ProductDiscount",
          productId: product._id,
          productImg: product.image,
          message: `${product.name} has promotion (${discountPercent}% off).`,
        });
      });
  
      // Save all notifications to the database
      await Notification.insertMany(notifications);
      await User.updateMany(
        {_id : { $ne: req.user._id}}, // Empty filter ({}), meaning update all documents in the collection
        { $inc: { notiCount: 1 } } // Use $inc operator to increment noticeCount by 1
      );
      io.emit('productDiscount', {
        productId: product._id
      })
    }

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

// @desc GET brands and categories
// @route GET /api/products/brandsAndCategories
// @access Public

const getBrandsAndCategories = asyncHandler(async(req, res) => {
  const data = await Product.fetchUniqueProductBrandsAndCategories();
  res.status(200).json({...data})
})


// @desc GET brands and categories
// @route GET /api/products/brandsAndCategories
// @access Public
const getFeaturedProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ isFeatured : true});

  if(product){
    res.status(200).json(product);
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
})

const getMaxPrice = asyncHandler(async (req, res ) => {
  const result = await Product.aggregate([
    { $group: { _id: null, maxPrice: { $max: '$price' } } }
  ]);

  if (result.length > 0) {
    return res.status(200).json({
      maxPrice: result[0].maxPrice
    })
  } else {
    return res.status(404).json({
      maxPrice: 0
    })
  }
})


export { getAllProducts, getProductById, createProduct,imageUpload, updateProduct, deleteProduct, createProductReview ,getTopProducts, getBrandsAndCategories, getFeaturedProduct, getMaxPrice}