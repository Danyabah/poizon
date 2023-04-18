import React, { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function StatisticApplication() {
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/statistic`).then((data) => {
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
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Статистика по заявкам</div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic table">
            <div className="table-row">
              <div className="table-td">2023</div>
              <div className="table-td">Количество заявок</div>
              <div className="table-td">Количество выполненных заказов</div>
              <div className="table-td">Сумма выкупа в юанях</div>
              <div className="table-td">Сумма выкупа в рублях</div>
              <div className="table-td">Комиссия заработанная</div>
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
