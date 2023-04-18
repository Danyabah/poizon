import React, { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function OrderList() {
  useEffect(() => {
    axios
      .get(
        `http://45.84.227.72:5000/checklist/?page=1&limit=10&previewimage=no`
      )
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Заказы</div>
          </div>
          <div className="push90 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot table orders">
            <div className="table-row">
              <div className="table-td">Номер заказа</div>
              <div className="table-td">Дата заказа</div>
              <div className="table-td">Статус заказа</div>
              <div className="table-td">Сумма в рублях (юанях)</div>
              <div className="table-td">Способ доставки</div>
              <div className="table-td">Телефон</div>
              <div className="table-td">Имя</div>
            </div>
            <div className="table-row">
              <div className="table-td">
                <a href="order_card.html">1554</a>
              </div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
            </div>
          </div>
        </div>
        <div className="push100 hidden-xss"></div>
        <div className="push30  hidden-xss"></div>
        <div className="push20  visible-xss"></div>
        <div className="container">
          <ul className="pagination">
            <li>
              <a href="#" className="prev-page">
                {"<"}
              </a>
            </li>
            <li>
              <a href="#" className="page">
                1
              </a>
            </li>
            <li>
              <a href="#" className="next-page">
                {">"}
              </a>
            </li>
          </ul>
        </div>
        <div className="push80"></div>
      </section>
    </>
  );
}
