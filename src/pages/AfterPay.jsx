import React from "react";
import Header from "../components/Header";

export default function AfterPay() {
  return (
    <>
      <Header />
      <div class="line"></div>
      <div class="push40 hidden-xss"></div>
      <div class="push20 visible-xss"></div>
      <section class="main-section">
        <div class="container">
          <div class="main-inner">
            <div class="title">Заказ #1554</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="text">Название товара</div>
          </div>
        </div>
        <div class="push40 hidden-xss"></div>
        <div class="push20 visible-xss"></div>
        <div class="line"></div>
        <div class="push40 hidden-xss"></div>
        <div class="push20 visible-xss"></div>
        <div class="container">
          <div class="main-inner pay">
            <div class="title">Сумма оплаты</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="price">19 214 ₽</div>
            <div class="push40 hidden-xss"></div>
            <div class="push15 visible-xss"></div>
            <div class="pay-wrap">
              <div class="title">Способ оплаты</div>
              <div class="push40 hidden-xss"></div>
              <div class="push10 visible-xss"></div>
              <div class="pay-in">
                <div class="text">Перевод по номеру карты Тинькофф</div>
                <a href="pay.html">Изменить</a>
              </div>
            </div>
          </div>
        </div>
        <div class="push40 hidden-xss"></div>
        <div class="push20 visible-xss"></div>
        <div class="line"></div>
        <div class="push40 hidden-xss"></div>
        <div class="push20 visible-xss"></div>
        <div class="container">
          <div class="main-inner pay">
            <form class="requisite">
              <div class="form-group">
                <div class="text bold700">Загрузите скриншот оплаты</div>
                <div class="push20"></div>
                <div class="file-input fileInput" id="fileInputWrap">
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/jpeg,image/png,image/gif"
                    name="fileInput[]"
                  />
                  <label for="fileInput">
                    <svg
                      width="28"
                      height="27"
                      viewBox="0 0 28 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.293 0.276958C13.683 -0.0923195 14.317 -0.0923195 14.707 0.276958L20.707 5.94363C21.098 6.31196 21.098 6.91068 20.707 7.27901C20.317 7.64829 19.683 7.64829 19.293 7.27901L15 3.22454V19.8335C15 20.3549 14.552 20.778 14 20.778C13.448 20.778 13 20.3549 13 19.8335V3.22454L8.70697 7.27901C8.31697 7.64829 7.68303 7.64829 7.29303 7.27901C6.90203 6.91068 6.90203 6.31196 7.29303 5.94363L13.293 0.276958ZM1 16.0558C1.552 16.0558 2 16.4789 2 17.0002V21.7224C2 23.2874 3.343 24.5558 5 24.5558H23C24.657 24.5558 26 23.2874 26 21.7224V17.0002C26 16.4789 26.448 16.0558 27 16.0558C27.552 16.0558 28 16.4789 28 17.0002V21.7224C28 24.33 25.761 26.4447 23 26.4447H5C2.239 26.4447 0 24.33 0 21.7224V17.0002C0 16.4789 0.448 16.0558 1 16.0558Z"
                        fill="black"
                      />
                    </svg>
                    Загрузить фото
                  </label>
                </div>
                <div class="images-wrapper"></div>
              </div>
              <div class="requisite-info">
                <div class="text bold700">Реквизиты</div>
                <div class="push20 hidden-xss"></div>
                <div class="push10 visible-xss"></div>
                <div class="text">
                  Для оплаты заказа переведите деньги на карту. Комментарий
                  оставьте пустым.
                </div>
                <div class="push40 hidden-xss"></div>
                <div class="push20 visible-xss"></div>
                <div class="text bold700">Номер карты</div>
                <div class="push20 hidden-xss"></div>
                <div class="push10 visible-xss"></div>
                <div class="text size">
                  1111 2222 3333 4444
                  <div class="copy">
                    <svg
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.93005 0.28142C6.12005 0.101031 6.38002 0 6.65002 0H13C15.76 0 18 2.11461 18 4.72222C20.76 4.72222 23 6.83683 23 9.44444V21.7222C23 24.3298 20.76 26.4444 18 26.4444H10C7.24 26.4444 5 24.3298 5 21.7222C2.24 21.7222 0 19.6076 0 17V6.35327C0 6.10488 0.100039 5.86691 0.290039 5.6903L5.93005 0.28142ZM16 4.72222V17C16 18.5649 14.66 19.8333 13 19.8333H5C3.34 19.8333 2 18.5649 2 17V8.5H8C8.55 8.5 9 8.07689 9 7.55556V1.88889H13C14.66 1.88889 16 3.15728 16 4.72222ZM7 1.9512V6.61111H2.14001L7 1.9512ZM10 24.5556C8.34 24.5556 7 23.2872 7 21.7222H13C15.76 21.7222 18 19.6076 18 17V6.61111C19.66 6.61111 21 7.8795 21 9.44444V21.7222C21 23.2872 19.66 24.5556 18 24.5556H10Z"
                        fill="#0081AB"
                      />
                    </svg>
                  </div>
                </div>
                <div class="push20 hidden-xss"></div>
                <div class="push10 visible-xss"></div>
                <div class="text">Получатель: Илья Владимирович Б.</div>
              </div>
              <button class="button">Готово</button>
            </form>
            <div class="push70"></div>
          </div>
        </div>
      </section>
    </>
  );
}
