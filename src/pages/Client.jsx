import React from "react";
import Header from "../components/Header";

export default function Client() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push45 hidden-xss"></div>
      <div className="push15 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Отследить свой заказ</div>
            <div className="push20"></div>
          </div>
        </div>
        <div className="container">
          <div className="main-inner">
            <form>
              <div className="form-group">
                <label className="label" htmlFor="link">
                  Ссылка на заказ
                </label>
                <input name="link" type="text" className="form-control" id="link" />
              </div>
              <div className="push10 visible-xss"></div>
              <button className="button no-icon enter">Отслеживать</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
