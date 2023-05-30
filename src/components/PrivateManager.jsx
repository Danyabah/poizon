import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateManager({ children }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  if (!Object.keys(userInfo).length) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
