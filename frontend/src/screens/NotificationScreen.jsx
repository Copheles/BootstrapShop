import React, { useEffect } from "react";
import Meta from "../components/Meta";
import {
  useGetUserNotificationQuery,
  useUpdateNotiToReadMutation,
} from "../slices/notificationApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import timeAgo from "../utils/timeAgo";

const NotificationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetUserNotificationQuery(userInfo._id);
  const [notiRead] = useUpdateNotiToReadMutation();

  const navigate = useNavigate();

  const handleClick = (orderId, notiId) => {
    notiRead(notiId);
    navigate(`/order/${orderId}`);
  };


  return (
    <>
      <Meta title="Notifications" />
      <h2>Notifications</h2>
      <div>
        {data &&
          data.length > 0 &&
          data.map((noti) => (
            <div
              className={`noti-box ${noti.read ? "read" : null}`}
              key={noti._id}
              onClick={() => handleClick(noti.orderId, noti._id)}
            >
              <p className="noti-text">
                <IoCheckmarkCircle size={18} style={{ color: 'green'}}/>
                {noti.message}
              </p>
              <div className="noti-date">{timeAgo(noti.createdAt)}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NotificationScreen;
