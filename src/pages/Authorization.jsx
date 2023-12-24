import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Authorization() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push45 hidden-xss"></div>
      <div className="push30 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Авторизируйтесь</div>
          </div>
        </div>
        <div className="container">
          <div className="main-inner">
            <div className="push45 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <div className="button-wrapper">
              <Link
                to={"/client"}
                href="autorisation_client.html"
                className="button autorisation no-icon"
              >
                Я покупатель
              </Link>
              <Link
                to={"/work"}
                href="autorisation_work.html"
                className="button autorisation no-icon"
              >
                Я работаю здесь
              </Link>
              <Link
                to={"/calcprice"}
                href="autorisation_work.html"
                className="button autorisation no-icon"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
