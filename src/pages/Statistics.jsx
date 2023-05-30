import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Statistics() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push25"></div>
          <div className="main-inner">
            <div className="title">Статистика</div>
            <div className="push30"></div>
          </div>
          <div className="push100 hidden-xss"></div>
          <div className="push120 hidden-xss"></div>
          <div className="statistics-wrapper">
            <Link to={"/statisticapplication"} className="item">
              Статистика по заявкам
            </Link>
            <Link to={"/statisticcategories"} className="item">
              Статистика с категориями
            </Link>
            {/* <Link to={"/statisticbrand"} className="item">
              Статистика с брендами
            </Link> */}
            <Link to={"/statisticnumber"} className="item">
              Статистика с количеством людей, сделавших более определенного
              количества заказов
            </Link>
          </div>
        </div>

        <div className="push100"></div>
        <div className="push100"></div>
        <div className="push100"></div>
      </section>
    </>
  );
}
