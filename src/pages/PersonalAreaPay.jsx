import React from "react";

export default function PersonalAreaPay() {
  return (
    <>
      <header class="header-wrapper">
        <div class="container">
          <div class="header">
            <div class="logo">POIZON</div>
            <div class="buttons-wrapper">
              <a href="#" class="track button">
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
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="line"></div>
      <div class="push60 hidden-xss"></div>
      <div class="push20 visible-xss"></div>
      <section class="main-section">
        <div class="container">
          <div class="main-inner">
            <div class="title">Заказ #1561</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="text">Статус Проверка оплаты</div>
            <div class="push40 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <ul class="tabs">
              <li>
                <a href="personal_area_order.html">Заказ</a>
              </li>
              <li class="current">
                <a href="personal_area_pay.html">Оплата</a>
              </li>
              <li>
                <a href="#">Клиент</a>
              </li>
              <li>
                <a href="#">Доставка</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="line"></div>
        <div class="container">
          <div class="main-inner">
            <section class="special-goods-wrapper">
              <div class="section">
                <div class="push60 hidden-xss"></div>
                <div class="push10 visible-xss"></div>
                <div class="box visible">
                  <div class="button-wrapper">
                    <button class="button no-icon">Принять оплату</button>
                    <button class="button no-icon">Отклонить оплату</button>
                  </div>
                  <div class="push40 hidden-xss"></div>
                  <div class="push10 visible-xss"></div>
                  <form>
                    <div class="form-group">
                      <label class="label" for="sum">
                        Сумма к оплате
                      </label>
                      <input
                        name="sum"
                        type="text"
                        class="form-control"
                        id="sum"
                        disabled
                        value="19214,00"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="type">
                        Тип оплаты
                      </label>
                      <input
                        name="type"
                        type="text"
                        class="form-control"
                        id="type"
                      />
                    </div>
                    <div class="push20 hidden-xss"></div>
                    <div class="push10 visible-xss"></div>
                    <div class="title-img">
                      Изображение чека оплаты покупателем
                    </div>
                    <div class="push20 hidden-xss"></div>
                    <div class="push10 visible-xss"></div>
                    <div class="img-wrapper">
                      <div class="item-img">
                        <a
                          href=""
                          class="absolute fancybox"
                          data-fancybox="portfolio"
                          data-thumb="images/check.png"
                        ></a>
                        <img src="" />
                      </div>
                    </div>
                    <div class="push90"></div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
