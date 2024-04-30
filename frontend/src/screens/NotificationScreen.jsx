import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import {
  useGetUserNotificationQuery,
  useUpdateNotiToReadMutation,
} from "../slices/notificationApiSlice";
import { useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import { Button, Spinner } from "react-bootstrap";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import NotiIconType from "../components/NotiIconType";
import { IoIosCheckmarkCircle } from "react-icons/io";

const NotificationScreen = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notiList, setNotiList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data } = useGetUserNotificationQuery(pageNumber);
  const [notiRead] = useUpdateNotiToReadMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      // Update notiList based on the received data
      setNotiList((prevNotiList) => [...prevNotiList, ...data.notifications]);
      setLoading(false);
    }
  }, [data]);

  const handleClick = (orderId, notiId) => {
    notiRead(notiId);
    navigate(`/order/${orderId}`);
  };

  const loadMoreNotifications = () => {
    if (!loading && data && pageNumber < data.pages) {
      setLoading(true);
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      <Meta title="Notifications" />
      <h2>Notifications</h2>
      <div className="mt-3">
        {notiList.length > 0 &&
          notiList.map((noti) => (
            <div
              className={`noti-box ${noti.read ? "read" : null}`}
              key={noti._id}
              onClick={() => handleClick(noti.orderId, noti._id)}
            >
              <NotiIconType type={noti.notiType} />
              <div className="noti-text-box">
                <h4 className="d-flex gap-1 align-items-center">
                  <IoIosCheckmarkCircle
                    className="icons"
                    style={{ color: "#0f7c18"}}
                    size={18}
                  />
                  {noti.notiType}
                </h4>
                <p className="noti-text">{noti.message}</p>
                <div className="noti-date">{timeAgo(noti.createdAt)}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex flex-row-reverse">
        {pageNumber < (data?.pages || 1) && (
          <Button
            className="btn-sm mt-3"
            onClick={loadMoreNotifications}
            disabled={loading}
            variant="dark"
          >
            {loading ? <Spinner size="sm" /> : <MdKeyboardDoubleArrowRight />}
          </Button>
        )}
      </div>
    </>
  );
};

export default NotificationScreen;
