import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProvementForm from "../components/ProvementForm";

export default function AfterPay() {
  const product = useSelector((state) => state.user.currentProductInfo);
  const paymentmethod = useSelector((state) => state.user.payMethod);

  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push40 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Заказ #{product?.id}</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">
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
          <div className="main-inner pay">
            <div className="title">Сумма оплаты</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="price">
              {product?.fullprice?.toLocaleString()} ₽
            </div>
            <div className="push40 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div className="pay-wrap">
              <div className="title">Способ оплаты</div>
              <div className="push40 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="pay-in">
                <div className="text">
                  Перевод по номеру карты{" "}
                  {paymentmethod === "tink"
                    ? "Тинькофф"
                    : paymentmethod == "ralf"
                    ? "Райффайзен"
                    : paymentmethod == "alfa"
                    ? "Альфабанк"
                    : ""}
                </div>
                <Link to="/pay">Изменить</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="push40 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
        <div className="line"></div>
        <div className="push40 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
        <div className="container">
          <div className="main-inner pay">
            <ProvementForm />
            <div className="push70"></div>
          </div>
        </div>
      </section>
    </>
  );
}
