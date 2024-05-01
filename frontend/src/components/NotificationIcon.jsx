import React, { useEffect } from "react";
import { Badge, Nav } from "react-bootstrap";
import { FaBell } from "react-icons/fa";

import { LinkContainer } from "react-router-bootstrap";
import {
  useGetUserNotiCountQuery,
  useProfileMutation,
} from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNotiCount } from "../slices/authSlice";
import { useSocket } from "../hooks/useSocket";
import { notificationApiSlice } from "../slices/notificationApiSlice";

const NotificationIcon = ({ handleLinkClick, cart }) => {
  const { userInfo, notiCount } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [updateProfile] = useProfileMutation();
  const { data, refetch } = useGetUserNotiCountQuery(userInfo._id);
  const { listenToEvent, cleanupListeners } = useSocket();

  const handleClickNoti = async () => {
    await updateProfile({
      notiCount: 0,
    });
    dispatch(setNotiCount(0));
    dispatch(notificationApiSlice.util.invalidateTags(["Notifications"]));
  };

  useEffect(() => {
    listenToEvent("setDelivery", (data) => {
      console.log("delivery");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
          dispatch(setNotiCount(notiCount + 1));
        }
      }
    });

    listenToEvent("setPaid", (data) => {
      console.log("paid");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
          dispatch(setNotiCount(notiCount + 1));
        }
      }
    });

    listenToEvent("setOrder", (data) => {
      console.log("ordered");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
          dispatch(setNotiCount(notiCount + 1));
        }
      }
    });

    listenToEvent("productDiscount", (data) => {
      console.log('discount ');
      if(userInfo){
        console.log('true');
        refetch()
        dispatch(setNotiCount(notiCount + 1))
      }
    })

    return () => cleanupListeners();
  }, [dispatch, cleanupListeners, listenToEvent, refetch, notiCount, userInfo]);
  //

  return (
    <LinkContainer
      to="/notifications"
      className={`cart-${cart} mx-1`}
      onClick={handleClickNoti}
    >
      <Nav.Link>
        <FaBell className="cart-btn" onClick={handleLinkClick} />
        {data && data.notiCount > 0 && (
          <Badge pill bg="info" className="mx-auto">
            {data.notiCount}
          </Badge>
        )}
      </Nav.Link>
    </LinkContainer>
  );
};

export default NotificationIcon;
