import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import axios from "axios";
import { setCurrentProductInfo } from "../redux/slices/userReducer";

export default function OrderPageInProgress() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/checklist/${id}`).then((res) => {
      console.log(res);
      setProduct(res.data);
      dispatch(setCurrentProductInfo(res.data));
    });
  }, [id]);

  console.log(product);
  console.log(status[product?.status]);
  console.log(stage[product?.status]);
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="text">Статус: {status[product?.status]}</div>
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <div className="title">
              {product?.brand} {product?.model}
            </div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">
              {product?.subcategory}, размер {product?.size}
            </div>
            <div className="push10 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
            <a
              className="text"
              href={product?.link}
              rel="noreferrer"
              target="_blank"
            >
              Ссылка
            </a>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="price">
              {product?.fullprice?.toLocaleString()} ₽
            </div>
            <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div
              onClick={() => setVisible((prev) => !prev)}
              className="more-wrapper"
              style={{ cursor: "pointer" }}
            >
              Подробности расчета
            </div>
            <div>
              <div className="push30 hidden-xss"></div>
              <div className="table-wrapper">
                {visible && (
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
                )}
              </div>
            </div>
            <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div className="text">Способ доставки: {product?.delivery}</div>
            <div className="push20 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
            <div className="text">
              Адрес: Тверь Проспект Победы, 73 На Проспекте Победы
            </div>
            <div className="push35 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            {stage[product?.status] < 6 && (
              <Link to={"/order"} className="change">
                Изменить данные доставки
              </Link>
            )}
            <div className="push40 hidden-xss"></div>
            <div className="push25 visible-xss"></div>
            <section>
              <div className="history-wrap">
                <div className="title">История заказа</div>
                <div className="push60 hidden-xss"></div>
                <div className="push10 visible-xss"></div>
                <div className="text">
                  В этом разделе мы показываем, где сейчас ваш заказ. Обычно до
                  России заказы доходят за три недели.
                </div>
                <div className="push50 hidden-xss"></div>
                <div className="push30 visible-xss"></div>
                <ul>
                  <li
                    className={`text ${
                      stage[product?.status] > 0 ? "ready" : ""
                    }`}
                  >
                    Проверка оплаты
                    <ul>
                      <li>
                        <a
                          href={product?.paymentprovement}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Чек об оплате
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 1 ? "ready" : ""
                    }`}
                  >
                    Оплачен
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 1 ? "ready" : ""
                    }`}
                  >
                    На закупке
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 2 ? "ready" : ""
                    }`}
                  >
                    Закуплен
                    <ul>
                      <li>
                        Цена закупки: {product?.realprice?.toLocaleString()} CNY
                      </li>
                      <li>
                        <a
                          href={product?.checkphoto}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Чек закупки №1
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">Чек закупки №2</a>
                      </li> */}
                    </ul>
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 3 ? "ready" : ""
                    }`}
                  >
                    На складе в Китае
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 4 ? "ready" : ""
                    }`}
                  >
                    Доставка на склад РФ
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 5 ? "ready" : ""
                    }`}
                  >
                    На складе в РФ
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 6 ? "ready" : ""
                    }`}
                  >
                    Доставляется
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 7 ? "ready" : ""
                    }`}
                  >
                    Завершен
                  </li>
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
