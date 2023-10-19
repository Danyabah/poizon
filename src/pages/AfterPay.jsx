import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProvementForm from "../components/ProvementForm";
import axios from "axios";
import Timer from "../components/Timer";

export default function AfterPay() {
  const paymentmethod = useSelector((state) => state.user.payMethod);
  const [product, setProduct] = useState({});
  const split = useSelector((state) => state.user.split);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <>
      <Header />
      <Timer />
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
            {split ? (
              <div className="price">
                {Math.round(product?.fullprice / 2)?.toLocaleString()} ₽
              </div>
            ) : (
              <div className="price">
                {product?.fullprice?.toLocaleString()} ₽
              </div>
            )}
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
                <Link to={`/pay/${product.id}`}>Изменить</Link>
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
            <ProvementForm product={product} />
            <div className="push70"></div>
          </div>
        </div>
      </section>
    </>
  );
}
