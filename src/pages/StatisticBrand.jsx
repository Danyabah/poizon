import React from "react";
import Header from "../components/Header";

export default function StatisticBrand() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Статистика с брендами</div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic table brands">
            <div className="table-row">
              <div className="table-td">2023</div>
              <div className="table-td">Nike</div>
              <div className="table-td">Adidas</div>
              <div className="table-td">Другое</div>
              <div className="table-td">Другое</div>
              <div className="table-td">Другое</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
            </div>
            <div className="table-row">
              <div className="table-td">Февраль</div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
            </div>
            <div className="table-row">
              <div className="table-td">Март</div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
            </div>
          </div>
        </div>
        <div className="push100"></div>
        <div className="push100"></div>
        <div className="push100"></div>
      </section>
    </>
  );
}
