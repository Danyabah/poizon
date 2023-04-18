import React from "react";
import Header from "../components/Header";

export default function OrderPage() {
  return (
    <>
      <Header />
      <div class="line"></div>
      <div class="push60 hidden-xss"></div>
      <div class="push20 visible-xss"></div>
      <section class="main-section">
        <div class="container">
          <div class="main-inner">
            <div class="title">Название товара</div>
            <div class="push20"></div>
            <div class="text size">
              Размер: 41
              <a href="#">
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
            <div class="push40 hidden-xss"></div>
            <div class="push20 visible-xss"></div>
            <div class="price">19 214 ₽</div>
            <div class="push40 hidden-xss"></div>
            <div class="push20 visible-xss"></div>
            <section>
              <div class="order-img-wrap">
                <div class="img-wrapper">
                  <a
                    href=""
                    class="absolute fancybox"
                    data-fancybox="portfolio"
                    data-thumb="images/1.jpg"
                  ></a>
                  <img src="" alt="" />
                </div>
                <div class="table-wrapper">
                  <table>
                    <tr>
                      <th>Цена в CNY</th>
                      <td>1 579 ¥</td>
                    </tr>
                    <tr>
                      <th>Курс обмена</th>
                      <td>10,3 ₽</td>
                    </tr>
                    <tr>
                      <th>Цена в RUB</th>
                      <td>16 264 ₽</td>
                    </tr>
                    <tr>
                      <th>Доставка по Китаю</th>
                      <td>350 ₽</td>
                    </tr>
                    <tr>
                      <th>Доставка в РФ</th>
                      <td>1 100 ₽</td>
                    </tr>
                    <tr>
                      <th>Комиссия сервиса</th>
                      <td>1 500 ₽</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="push60 hidden-xss"></div>
              <div class="push25 visible-xss"></div>
              <div class="history-wrap">
                <div class="title">История заказа</div>
                <div class="push60 hidden-xss"></div>
                <div class="push20 visible-xss"></div>
                <div class="text">
                  В этом разделе мы показываем, где сейчас ваш заказ. Обычно до
                  России заказы доходят за три недели.
                </div>
                <div class="push50 hidden-xss"></div>
                <div class="push20 visible-xss"></div>
                <ul>
                  <li class="text">Проверка оплаты</li>
                  <li class="text">Оплачен</li>
                  <li class="text">На закупке</li>
                  <li class="text">Закуплен</li>
                  <li class="text">На складе в Китае</li>
                  <li class="text">Доставка на склад РФ</li>
                  <li class="text">На складе в РФ</li>
                  <li class="text">Доставляется</li>
                  <li class="text">Завершен</li>
                </ul>
                <a
                  href="pay.html"
                  style={{ gridGap: "10px" }}
                  class="button no-icon"
                >
                  Оплатить <span>19 214 ₽</span>
                </a>
              </div>
            </section>
            <div class="push100"></div>
            <div class="push100"></div>
          </div>
        </div>
      </section>
    </>
  );
}
