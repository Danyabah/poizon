import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import UserForm from "../components/UserForm";

export default function Order() {
  const product = useSelector((state) => state.user.currentProductInfo);

  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Заказ #{product?.id}</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">
              {" "}
              {product?.brand} {product?.model}
            </div>
          </div>
        </div>
        <div className="push40 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
        <div className="line"></div>
        <div className="push40 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
        <div className="container">
          <div className="main-inner rf">
            <UserForm />
          </div>
        </div>
        <div className="push90"></div>
      </section>
    </>
  );
}
