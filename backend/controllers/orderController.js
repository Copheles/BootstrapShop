import asyncHandler from '../middleware/asyncHandler.js';
import Order from './../models/orderModel.js';
import Product from './../models/productModel.js'



// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

  // console.log("OrdetItems ", orderItems)

  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
  }else{
    await Promise.all(orderItems.map(async (item) => {
      const productId = item._id;
      const quantity = item.qty;
    
      const product = await Product.findById(productId);
    
      if (product) {
        let prevStock = product.countInStock;
        // Update stock quantities and soldCount
        product.countInStock = product.countInStock - quantity;
        if(product.countInStock < 0){
          product.countInStock = prevStock;
          res.status(401)
          throw new Error(`${prevStock === 0 ? `${product.name} is out of stock now`: `${product.name} is only ${prevStock} left` }`)
        }
        console.log('hello')
        product.soldAmount = product.soldAmount + quantity;
    
        console.log("Stock: ",product.countInStock);
        console.log("SoldAmount: ", product.soldAmount)
        // Save the updated product
        await product.save();
        console.log(`Product with ID ${productId} updated successfully.`);
      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    }));
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({ 
        ...orderItem,
        product: orderItem._id,
        _id: undefined // because orderItem has _id field we don't want to put.
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    console.log('order', order)
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }

  
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({ user: req.user._id});
  console.log("count: ", count)

  const orders = await Order.find({ user: req.user._id}).limit(pageSize).skip(pageSize * (page - 1)).sort({createdAt: -1});
  res.status(200).json({orders, page, pages: Math.ceil(count / pageSize)})
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('user', 'name email')

  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error('Order not found')
  }
})




// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updated_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const updatedOrder = await order.save();
    console.log("Order updated successfully.");
    res.status(200).json(updatedOrder);
  } else {
    console.error('Order not found');
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/delivered
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get all orders
// @route PUT /api/orders/:id/delivered
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments();

  const orders = await Order.find({}).populate('user', 'id name').limit(pageSize).skip(pageSize * (page - 1)).sort({createdAt: -1});
  res.status(200).json({
    orders,
    page,
    pages: Math.ceil(count / pageSize)
  })
})



export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };