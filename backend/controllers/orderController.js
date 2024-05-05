import asyncHandler from '../middleware/asyncHandler.js';
import Order from './../models/orderModel.js';
import Product from './../models/productModel.js'
import { getUserSocketId, io } from '../socket/socket.js';
import User from '../models/userModel.js';
import Notification from '../models/notificationModel.js'


// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

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
        if(product.countInStock - quantity  < 0){

          res.status(401)
          throw new Error(`${prevStock === 0 ? `${product.name} is out of stock now`: `${product.name} is only ${prevStock} left` }`)
        }
        product.countInStock = product.countInStock - quantity;
        product.soldAmount = product.soldAmount + quantity;
    
        
        // Save the updated product
        await product.save();

        io.emit('changeAmount', {
          productId: productId,
        });

      } else {
        res.status(404)
          throw new Error('product not found')
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
    const createdOrder = await order.save()
    const adminUser = await User.findOne({
      isAdmin: true
    })

    if(adminUser){
      adminUser.notiCount = adminUser.notiCount + 1

      await adminUser.save()
    }

    const notification = new Notification({
      userId: adminUser._id,
      type: "order",
      notiType: "createOrder",
      orderId: createdOrder._id,
      message: `${req.user._id} has been ordered Order id:(${createdOrder._id}).`,
    })


    await notification.save()
    
    const orderedUserSocketId = getUserSocketId(adminUser.name)

    // console.log("orderedUserSocketId: ", orderedUserSocketId);

    io.to(orderedUserSocketId).emit("setOrder", {
      userId: adminUser._id
    })

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
  console.log("order, ", order);
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
    const adminUser = await User.findOne({
      isAdmin: true
    })

    const notification = new Notification({
      userId: adminUser._id,
      type: 'order',
      notiType: "paidOrder",
      orderId: order._id,
      message: `Order id:(${order._id}) has been paid.`,
    })

    if(adminUser){
      adminUser.notiCount = adminUser.notiCount + 1

      await adminUser.save()
    }

    await notification.save()
    
    const orderedUserSocketId = getUserSocketId(adminUser.name)
    // console.log(orderedUserSocketId);

    io.to(orderedUserSocketId).emit("setPaid", {
      userId: adminUser._id,
      serverIsPaid: updatedOrder.isPaid,
      paidAt: updatedOrder.paidAt
    })


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
  const order = await Order.findById(req.params.id).populate('user');

  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    const notification = new Notification({
      userId: order.user._id,
      type: 'order',
      notiType: "deliveredOrder",
      orderId: order._id,
      message: `Your order ${order._id} has been delivered.`,
    })

    const user = await User.findById(order.user._id)

    if(user){
      user.notiCount = user.notiCount + 1

      await user.save()
    }

    await notification.save()

    const orderedUserSocketId = getUserSocketId(order.user.name)

    console.log("orderedUserSocketId: ", orderedUserSocketId);


    io.to(orderedUserSocketId).emit("setDelivery", {
      userId: order.user._id,
      orderId: order._id,
      serverDeliveredAt: updatedOrder.deliveredAt
    })

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

  const { data, total, page, pages} = res.advancedResults;
  res.status(200).json({
    orders: data,
    total,
    page,
    pages
  })
})



export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };