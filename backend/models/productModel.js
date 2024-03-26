import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
  }, 
  comment: {
    type: String,
    required: true
  },
  
},{ 
  timestamps: true
})

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewProduct: {
    type: Boolean,
    required: true,
    default: false
  },
  soldAmount: {
    type: Number,
    required: true,
    default: 0
  }
},{
  timestamps: true,
})


productSchema.statics.fetchUniqueProductBrandsAndCategories = async function() {
  try {
    const brands = await this.distinct('brand');
    const categories = await this.distinct('category');
    return { brands, categories};
  } catch (error) {
    console.error("Error fetching unique product brands:", error);
    throw error;
  }
};


const Product = mongoose.model("Product", productSchema)

export default Product