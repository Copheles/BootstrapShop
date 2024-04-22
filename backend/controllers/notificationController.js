import asyncHandler from '../middleware/asyncHandler.js';
import Notification from './../models/notificationModel.js';

// @desc Fetch all notifications
// @route GET /api/notifications
// @access Private
const getAllNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const notifications = await Notification.find({ userId  }).sort('-createdAt')

  res.status(200).json(notifications)
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