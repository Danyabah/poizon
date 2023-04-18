import React from "react";
import Header from "../components/Header";

export default function Order() {
  return (
    <>
      <Header />
      <div class="line"></div>
      <div class="push60 hidden-xss"></div>
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
          <div class="main-inner rf">
            <form class="order">
              <div class="form-group">
                <label class="label" for="name">
                  <span>*</span>Как к вам обращаться?
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  class="required form-control"
                  id="name"
                />
              </div>
              <div class="form-group">
                <label class="label" for="tel">
                  <span>*</span>Телефон
                </label>
                <input
                  name="tel"
                  type="text"
                  required
                  class=" required form-control"
                  id="tel"
                />
              </div>
              <div class="push20 hidden-xss"></div>
              <div class="text">
                Если по заказу возникнут вопросы, то по номеру телефона мы
                поймем чей заказ и оперативно созвонимся. Не рассылаем SMS-спам
                и не звоним с рекламой.
              </div>
              <div class="push40 hidden-xss"></div>
              <div class="push10 visible-xss"></div>
              <div class="form-group">
                <label class="label" for="Telegram">
                  Telegram
                </label>
                <input
                  name="Telegram"
                  type="text"
                  class="form-control"
                  id="Telegram"
                />
              </div>
              <div class="push20 hidden-xss"></div>
              <div class="push5 visible-xss"></div>
              <button class="button">Сохранить</button>
            </form>
          </div>
        </div>
        <div class="push90"></div>
      </section>
    </>
  );
}
