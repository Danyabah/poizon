import React from "react";
import Header from "../components/Header";

export default function RequestCard() {
  return (
    <>
      <Header />
      <div class="line"></div>
      <section class="main-section">
        <div class="container">
          <div class="push45 hidden-xss"></div>
          <div class="push15 visible-xss"></div>
          <div class="main-inner">
            <div class="title">Заявка №1554</div>
          </div>
          <div class="push90 hidden-xss"></div>
          <div class="push20 visible-xss"></div>
        </div>
        <div class="container">
          <div class="check-table depot table orders">
            <div class="table-row">
              <div class="table-td">Номер заказа</div>
              <div class="table-td">Дата заказа</div>
              <div class="table-td">Статус заказа</div>
              <div class="table-td">Сумма в рублях (юанях)</div>
              <div class="table-td">Способ доставки</div>
              <div class="table-td">Телефон</div>
              <div class="table-td">Имя</div>
            </div>
            <div class="table-row">
              <div class="table-td">1554</div>
              <div class="table-td">22.10.22</div>
              <div class="table-td">На закупке</div>
              <div class="table-td">1000</div>
              <div class="table-td">Курьером</div>
              <div class="table-td">121212</div>
              <div class="table-td">Иван</div>
            </div>
          </div>
        </div>
        <div class="push100 hidden-xss"></div>
        <div class="push30  hidden-xss"></div>
        <div class="push20  visible-xss"></div>
        <div class="container">
          <ul class="pagination">
            <li>
              <a href="#" class="prev-page">
                {"<"}
              </a>
            </li>
            <li>
              <a href="#" class="page">
                1
              </a>
            </li>
            <li>
              <a href="#" class="next-page">
                {">"}
              </a>
            </li>
          </ul>
        </div>
        <div class="push80"></div>
      </section>
    </>
  );
}
