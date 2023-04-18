import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Admin({ children }) {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (userInfo.job === "admin") {
    return children;
  } else {
    return <Navigate to={"/work"} />;
  }
}
