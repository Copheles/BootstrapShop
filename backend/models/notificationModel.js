import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  isAll: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['order', 'product'], // Define possible notification types
    required: true
  },
  notiType: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: function() {
      return this.type === 'order'; // Required if notification type is 'order'
    }
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: function() {
      return this.type === 'product'; // Required if notification type is 'product'
    }
  },
  productImg: {
    type: String,
    required: function() {
      return this.type === 'product'; // Required if notification type is 'product'
    }
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
