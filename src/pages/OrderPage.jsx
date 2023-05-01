import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentProductInfo } from "../redux/slices/userReducer";

export default function OrderPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/checklist/${id}`).then((res) => {
      setProduct(res.data);
      dispatch(setCurrentProductInfo(res.data));
    });
  }, [id]);

  console.log(product);
  return (
    <>
      <Header />
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
              {product?.fullprice?.toLocaleString()} ₽
            </div>
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <section>
              <div className="order-img-wrap">
                <div className="img-wrapper">
                  <img src={product?.Image?.[0]} alt="" />
                </div>
                <div className="table-wrapper">
                  <table>
                    <tbody>
                      <tr>
                        <th>Цена в CNY</th>
                        <td>{product?.curencycurency2?.toLocaleString()} ¥</td>
                      </tr>
                      <tr>
                        <th>Курс обмена</th>
                        <td>{product?.currency?.toLocaleString()} ₽</td>
                      </tr>
                      <tr>
                        <th>Цена в RUB</th>
                        <td>{product?.currency3?.toLocaleString()} ₽</td>
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
                  </table>
                </div>
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
                <Link
                  to="/pay"
                  style={{ gridGap: "10px" }}
                  className="button no-icon"
                >
                  Оплатить <span>19 214 ₽</span>
                </Link>
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
