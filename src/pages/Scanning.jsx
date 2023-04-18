import React from "react";
import Header from "../components/Header";

export default function Scanning() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push25 visible-xss"></div>
          <form className="main-inner">
            <button className="button no-icon scanning">
              Принять на склад
            </button>
            <div className="push60 hidden-xss"></div>
            <div className="push25 visible-xss"></div>

            <div className="form-group">
              <label className="label" htmlFor="searchCode">
                Шрих-код
              </label>
              <input
                name="searchCode"
                type="text"
                className="form-control"
                id="searchCode"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="searchTrack">
                Трек номер
              </label>
              <input
                name="searchTrack"
                type="text"
                className="form-control"
                id="searchTrack"
              />
            </div>
            <div className="push10 hidden-xss"></div>
            <button className="button no-icon scanning">Поиск</button>
          </form>
          <div className="push70 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot table">
            <div className="table-row">
              <div className="table-td">Номер заказа</div>
              <div className="table-td">Дата заказа</div>
              <div className="table-td">Дата приемки</div>
              <div className="table-td">Способ доставки</div>
              <div className="table-td">Телефон</div>
              <div className="table-td">Имя</div>
            </div>
            <div className="table-row">
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
