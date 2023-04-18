import React from "react";
import Header from "../components/Header";

export default function InfoClient() {
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
                <label class="label" for="type_delivery">
                  <span>*</span>Тип доставки
                </label>
                <select
                  name="type_delivery"
                  required
                  class="select-styler form-control required"
                  id="type_delivery"
                >
                  <option value="Самовывоз из шоурума">
                    Самовывоз из шоурума
                  </option>
                  <option value="Тип доставки 2">Тип доставки 2</option>
                  <option value="Тип доставки 3">Тип доставки 3</option>
                </select>
              </div>
              <div class="form-group">
                <label class="label" for="name">
                  ФИО получателя
                </label>
                <input
                  name="name"
                  type="text"
                  class=" form-control"
                  id="name"
                />
              </div>
              <div class="form-group">
                <label class="label" for="phone">
                  Телефон получателя
                </label>
                <input
                  name="phone"
                  type="text"
                  class=" form-control"
                  id="phone"
                />
              </div>
              <div class="push20 hidden-xss"></div>
              <div class="push5 visible-xss"></div>
              <button class="button">Сохранить</button>
            </form>
          </div>
        </div>
        <div class="push80"></div>
      </section>
    </>
  );
}
