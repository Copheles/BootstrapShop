import asyncHandler from '../middleware/asyncHandler.js';
import Notification from './../models/notificationModel.js';

// @desc Fetch all notifications
// @route GET /api/notifications
// @access Private
const getAllNotifications = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  
  const { userId } = req.params;

  const count = await Notification.countDocuments({ userId });

  const notifications = await Notification.find({
    $or: [
      { userId: userId },   // Match notifications with specific userId
      { isAll: true }       // Match notifications where isAll is true
    ]
  }).limit(pageSize).skip(pageSize * (page - 1)).sort({createdAt: -1});

  res.status(200).json({notifications, page, pages: Math.ceil(count / pageSize)})

  
})  


// @desc Update Read Noti
// @route PUT /api/notifications/read/:id
// @access Private
const updateNotiToRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const noti = await Notification.findById(id);

  if(noti){
    noti.read = true
  }

  const updatedNoti = await noti.save()

  res.status(200).json(updatedNoti)

})

export { getAllNotifications, updateNotiToRead}