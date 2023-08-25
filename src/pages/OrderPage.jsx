import React, { useState } from "react";
import Header from "../components/Header";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentProductInfo, setSplit } from "../redux/slices/userReducer";
import { stage } from "../utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Timer from "../components/Timer";
export default function OrderPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [promo, setPromo] = useState("");
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      setProduct(res.data);
      dispatch(setCurrentProductInfo(res.data));
      // console.log(res.data);
      setPromo(res.data?.promo);
    });
  }, [id]);

  if (stage[product?.status] >= 1) {
    return <Navigate to={`/orderpageinprogress/${id}`} />;
  }
  console.log(product);

  return (
    <>
      <Header />
      <Timer />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">
              {product?.brand} {product?.model}
            </div>
            <div className="push20"></div>
            <div className="text size">
              Размер: {product?.size}
              <a href={product?.link} rel="noreferrer" target="_blank">
                Открыть в Poizon
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M32 0H0V32H32V0Z" fill="white" />
                  <path
                    d="M28 24.9899V18.9899C28 18.4399 28.45 17.9929 29 17.9929C29.55 17.9929 30 18.4399 30 18.9899V24.9899C30 27.7499 27.76 29.9899 25 29.9899H7C4.24 29.9899 2 27.7499 2 24.9899V6.99292C2 4.23092 4.24 1.99292 7 1.99292H13C13.55 1.99292 14 2.43992 14 2.99292C14 3.54492 13.55 3.99292 13 3.99292H7C5.34 3.99292 4 5.33592 4 6.99292V24.9899C4 26.6499 5.34 27.9899 7 27.9899H25C26.66 27.9899 28 26.6499 28 24.9899Z"
                    fill="#0081AB"
                  />
                  <path
                    d="M26.58 4.00308L13.2901 17.2861C12.9001 17.6761 12.9001 18.3101 13.2901 18.7001C13.6801 19.0901 14.32 19.0901 14.71 18.7001L28 5.40707V10.9931C28 11.5451 28.45 11.9931 29 11.9931C29.55 11.9931 30 11.5451 30 10.9931V3.00711C30 3.00511 30 3.00211 30 2.99911C30 2.74111 29.9 2.4821 29.71 2.2861C29.47 2.0471 29.14 1.95411 28.83 2.00711L21 1.99307C20.45 1.99207 20 2.43912 20 2.99112C20 3.54312 20.45 3.99207 21 3.99307L26.58 4.00308Z"
                    fill="#0081AB"
                  />
                </svg>
              </a>
            </div>
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <div className="price">
              {product?.fullprice?.toLocaleString()} ₽{" "}
            </div>
            {promo && (
              <span className="text size">Применен промокод: {promo}</span>
            )}
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <section>
              <div className="order-img-wrap">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {product?.image?.length !== 0 && (
                    <>
                      <SwiperSlide key={0}>
                        <img src={product?.previewimage} alt="" />
                      </SwiperSlide>
                      {product?.image?.map((img, index) => {
                        if (index > 0) {
                          return (
                            <SwiperSlide key={index}>
                              <img src={img} alt="" />
                            </SwiperSlide>
                          );
                        }
                      })}
                    </>
                  )}
                </Swiper>

                <div
                  className="table-wrapper"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <table>
                    <div
                      onClick={() => setVisible((prev) => !prev)}
                      className={
                        visible
                          ? `more-wrapper more-wrapper-active`
                          : `more-wrapper`
                      }
                      style={{ cursor: "pointer", marginBottom: "20px" }}
                    >
                      <strong>Подробности расчета</strong>
                    </div>
                    {visible && (
                      <tbody>
                        <tr>
                          <th>Цена в CNY</th>
                          <td>
                            {product?.curencycurency2?.toLocaleString()} ¥
                          </td>
                        </tr>
                        <tr>
                          <th>Курс обмена</th>
                          <td>{product?.currency?.toLocaleString()} ₽</td>
                        </tr>
                        <tr>
                          <th>Цена в RUB</th>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {product?.currency3?.toLocaleString()} ₽
                          </td>
                        </tr>
                        <tr>
                          <th>Доставка по Китаю</th>
                          <td>{product?.chinadelivery?.toLocaleString()} ₽</td>
                        </tr>
                        <tr>
                          <th>Доставка в РФ</th>
                          <td>{product?.chinadelivery2?.toLocaleString()} ₽</td>
                        </tr>
                        <tr>
                          <th>Комиссия сервиса</th>
                          <td>{product?.commission?.toLocaleString()} ₽</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              <Link
                to={`/pay/${id}`}
                style={{ gridGap: "10px" }}
                className="button no-icon green-btn"
                onClick={() => dispatch(setSplit(false))}
              >
                Оплатить <span>{product?.fullprice} ₽</span>
              </Link>
              <div style={{ marginTop: "20px" }}>
                <Link
                  to={`/pay/${id}`}
                  style={{ gridGap: "10px" }}
                  className="button no-icon split-btn"
                  onClick={() => dispatch(setSplit(true))}
                >
                  <span style={{ display: "block" }}>
                    <strong>Оплатить Долями</strong>
                  </span>
                  <span style={{ display: "block" }}>
                    <strong>
                      {Math.round(product?.fullprice / 2)} ₽ |{" "}
                      {Math.round(product?.fullprice / 2)} ₽
                    </strong>
                  </span>
                </Link>
              </div>
              <div className="push60 hidden-xss"></div>
              <div className="push25 visible-xss"></div>
              <div className="history-wrap">
                <div className="title">История заказа</div>
                <div className="push60 hidden-xss"></div>
                <div className="push20 visible-xss"></div>
                <div className="text">
                  В этом разделе мы показываем, где сейчас ваш заказ. Обычно до
                  России заказы доходят за три недели.
                </div>
                <div className="push50 hidden-xss"></div>
                <div className="push20 visible-xss"></div>
                <ul>
                  <li className="text">Проверка оплаты</li>
                  <li className="text">Оплачен</li>
                  <li className="text">На закупке</li>
                  <li className="text">Закуплен</li>
                  <li className="text">На складе в Китае</li>
                  <li className="text">Доставка на склад РФ</li>
                  <li className="text">На складе в РФ</li>
                  <li className="text">Доставляется</li>
                  <li className="text">Завершен</li>
                </ul>
              </div>
            </section>
            <div className="push100"></div>
            <div className="push100"></div>
          </div>
        </div>
      </section>
    </>
  );
}
