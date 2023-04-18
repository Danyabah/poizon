import React, { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function RequestList() {
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
            <div className="title">Заявки</div>
          </div>
          <div className="push90 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot table request orders">
            <div className="table-row">
              <div className="table-td">
                Номер
                <br /> заявки
              </div>
              <div className="table-td">
                Дата и<br /> время
              </div>
              <div className="table-td">
                Статус
                <br /> заявки
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">
                <a href="request_card.html">1554</a>
              </div>
              <div className="table-td">22.10.2022 15:46</div>
              <div className="table-td">Оплачено</div>
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
