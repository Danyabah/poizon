import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setPayMethod, setSplit } from "../redux/slices/userReducer";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Timer from "../components/Timer";
import GiftChooseForm from "../components/GiftChooseForm";

export default function GiftChoose() {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);

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
            <div className="img-preview">
              <a href={product?.previewimage} className="" target="_blank">
                <img
                  style={{ objectFit: "contain" }}
                  src={product?.previewimage}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="push40 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
        <div className="line"></div>
        <div className="push40 hidden-xss"></div>
        <div className="push25 visible-xss"></div>
        <div className="container">
          <div className="main-inner pay">
            <div className="title">
              Выберите Подарок <i class="uil uil-gift"></i>
            </div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="push40"></div>
            <GiftChooseForm product={product} />
            <div className="push100"></div>
            <div className="push70"></div>
          </div>
        </div>
      </section>
    </>
  );
}
