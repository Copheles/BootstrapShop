import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import {
  useGetUserNotificationQuery,
  useUpdateNotiToReadMutation,
} from "../slices/notificationApiSlice";
import { useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import { Button, Placeholder, Spinner } from "react-bootstrap";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import NotiIconType from "../components/NotiIconType";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { TbTruckDelivery } from "react-icons/tb";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setNotiCount } from "../slices/authSlice";

const NotificationScreen = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notiList, setNotiList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userInfo, notiCount } = useSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetUserNotificationQuery({
    pageNumber,
    userId: userInfo._id,
  });

  const dispatch = useDispatch();
  const [updateProfile] = useProfileMutation();

  const [notiRead] = useUpdateNotiToReadMutation();

  const navigate = useNavigate();

  useEffect(() => {
    // Refetch notifications whenever the component mounts or userInfo changes
    setNotiList([]);
    refetch();
    updateProfile({
      notiCount: 0,
    });
    dispatch(setNotiCount(0));
  }, [userInfo._id, refetch, notiCount, dispatch, updateProfile]);

  useEffect(() => {
    if (data) {
      // Update notiList based on the received data
      setNotiList((prevNotiList) => [...prevNotiList, ...data.notifications]);
      setLoading(false);
    } else {
      setNotiList([]);
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
      {isLoading ? (
        <div className="mt-3 rounded">
          {Array.from({ length: 8 }, (_, index) => index).map((i) => (
            <Placeholder animation="glow" key={i}>
              <Placeholder xs={12} className="mb-1">
                <div
                  className={`noti-box`}
                  style={{ backgroundColor: "black", color: "black" }}
                >
                  <div
                    className="noti-type-icon-box"
                    style={{ backgroundColor: "black", color: "black" }}
                  >
                    <TbTruckDelivery className="noti-type-icon" />
                  </div>
                  <div
                    className="noti-text-box"
                    style={{ backgroundColor: "black", color: "black" }}
                  >
                    <h4
                      className="d-flex gap-1 align-items-center"
                      style={{ backgroundColor: "black", color: "black" }}
                    >
                      <IoIosCheckmarkCircle
                        className="icons"
                        style={{ color: "black" }}
                        size={18}
                      />
                      hello
                    </h4>
                    <p
                      className="noti-text"
                      style={{ backgroundColor: "black", color: "black" }}
                    >
                      hello
                    </p>
                    <div
                      className="noti-date"
                      style={{ backgroundColor: "black", color: "black" }}
                    >
                      hello
                    </div>
                  </div>
                </div>
              </Placeholder>
            </Placeholder>
          ))}
        </div>
      ) : (
        <>
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
                        style={{ color: "#0f7c18" }}
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
            {data && pageNumber < (data.pages || 1) && notiList.length > 0 && (
              <Button
                className="btn-sm mt-3"
                onClick={loadMoreNotifications}
                disabled={loading}
                variant="dark"
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <MdKeyboardDoubleArrowRight />
                )}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NotificationScreen;
