import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { status } from "../utils/utils";
import PaymentTab from "../components/PaymentTab";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../redux/slices/adminReducer";
import OrderTab from "../components/OrderTab";
import ClientTab from "../components/ClientTab";
import DeliveryTab from "../components/DeliveryTab";
import logo from "../utils/logo.PNG";

export default function PersonalAreaPay() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categ, setCateg] = useState(2);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/checklist/${id}`).then((res) => {
      setProduct(res.data);
      // console.log(res);
      dispatch(setSelectedProduct(res.data));
    });
  }, [id]);

  console.log(product);

  return (
    <>
      <header className="header-wrapper">
        <div className="container">
          <div className="header">
            <div className="logo">
              {" "}
              <Link to={"/managerpersonalaccount"}>
                <img className="img-logo " src={logo} alt="" />
              </Link>
            </div>
            <div className="buttons-wrapper">
              <Link to={"/personalareaorder"} className="track button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 22.75H3C2.04 22.75 1.25 21.96 1.25 21V8C1.25 3.58 3.58 1.25 8 1.25H16C20.42 1.25 22.75 3.58 22.75 8V16C22.75 20.42 20.42 22.75 16 22.75ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V21C2.75 21.14 2.86 21.25 3 21.25H16C19.58 21.25 21.25 19.58 21.25 16V8C21.25 4.42 19.58 2.75 16 2.75H8Z"
                    fill="#292D32"
                  />
                  <path
                    d="M15.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z"
                    fill="#292D32"
                  />
                  <path
                    d="M12 16.25C11.59 16.25 11.25 15.91 11.25 15.5V8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5V15.5C12.75 15.91 12.41 16.25 12 16.25Z"
                    fill="#292D32"
                  />
                </svg>
                Новый заказ
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Заказ #{product?.id}</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">Статус {status[product?.status]}</div>
            <div className="push40 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <ul className="tabs">
              <li
                className={categ === 1 ? "current" : ""}
                onClick={() => setCateg(1)}
              >
                <span>Заказ</span>
              </li>
              <li
                className={categ === 2 ? "current" : ""}
                onClick={() => setCateg(2)}
              >
                <span>Оплата</span>
              </li>
              <li
                className={categ === 3 ? "current" : ""}
                onClick={() => setCateg(3)}
              >
                <span>Клиент</span>
              </li>
              <li
                className={categ === 4 ? "current" : ""}
                onClick={() => setCateg(4)}
              >
                <span>Доставка</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="line"></div>
        <div className="container">
          <div className="main-inner">
            <section className="special-goods-wrapper">
              <div className="section">
                <div className="push60 hidden-xss"></div>
                <div className="push10 visible-xss"></div>
                {categ === 4 && <DeliveryTab />}
                {categ === 3 && <ClientTab />}
                {categ === 2 && <PaymentTab />}
                {categ === 1 && <OrderTab />}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
