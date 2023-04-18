import React from "react";
import Header from "../components/Header";

export default function StatisticCategories() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Статистика с категориями</div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic categories table">
            <div className="table-row">
              <div className="table-td">2023</div>
              <div className="table-td">Обувь</div>
              <div className="table-td">Одежда</div>
              <div className="table-td">Аксессуары</div>
              <div className="table-td">Электроника</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
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
            </div>
            <div className="table-row">
              <div className="table-td">Март</div>
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
