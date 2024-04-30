import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

const NotiIconType = ({ type }) => {
  let icon;

  switch (type) {
    case "deliveredOrder":
      icon = (
        <TbTruckDelivery
          className="noti-type-icon"
        />
      );
      break;
    case "createOrder":
      icon = (
        <FaBoxOpen className="noti-type-icon" />
      );
      break;
    case "paidOrder":
      icon = (
        <GiMoneyStack
          className="noti-type-icon"
        />
      );
      break;
    default:
      icon = (
        <IoIosCheckmarkCircle
          style={{ color: "green" }}
          className="noti-type-icon"
        />
      );
      break;
  }
  return <div className="noti-type-icon-box">{icon}</div>;
};

export default NotiIconType;
