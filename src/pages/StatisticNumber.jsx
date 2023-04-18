import React, { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function StatisticNumber() {
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/payments`).then((data) => {
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
            <div className="title">
              Статистика с количеством людей, сделавших более определенного
              количества заказов
            </div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic table number">
            <div className="table-row">
              <div className="table-td">2023</div>
              <div className="table-td">Более 1</div>
              <div className="table-td">Более 2</div>
              <div className="table-td">Более 3</div>
              <div className="table-td">Более 4</div>
              <div className="table-td">Более 5</div>
              <div className="table-td">Более 10</div>
              <div className="table-td">Более 25</div>
              <div className="table-td">Более 50</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
              <div className="table-td"></div>
              <div className="table-td"></div>
              <div className="table-td"></div>
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
