import React, { useRef } from "react";
import OrderForm from "../components/OrderForm";
import { useSelector } from "react-redux";

export default function PersonalAreaOrder() {
  const publicLink = useSelector((state) => state.admin.publicLink);
  const inp = useRef(null);
  return (
    <>
      <header className="header-wrapper">
        <div className="container">
          <div className="header">
            <div className="logo">POIZON</div>
            <div className="buttons-wrapper">
              <a href="personal_area_order.html" className="track button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 22.75H3C2.04 22.75 1.25 21.96 1.25 21V8C1.25 3.58 3.58 1.25 8 1.25H16C20.42 1.25 22.75 3.58 22.75 8V16C22.75 20.42 20.42 22.75 16 22.75ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V21C2.75 21.14 2.86 21.25 3 21.25H16C19.58 21.25 21.25 19.58 21.25 16V8C21.25 4.42 19.58 2.75 16 2.75H8Z"
                    fill="#292D32"
                  />
                  <path
                    d="M15.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z"
                    fill="#292D32"
                  />
                  <path
                    d="M12 16.25C11.59 16.25 11.25 15.91 11.25 15.5V8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5V15.5C12.75 15.91 12.41 16.25 12 16.25Z"
                    fill="#292D32"
                  />
                </svg>
                Новый заказ
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Заказ #___</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">Статус Расчет</div>
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <ul className="tabs">
              <li className="current">
                <a href="personal_area_order.html">Заказ</a>
              </li>
              <li>
                <a href="personal_area_pay.html">Оплата</a>
              </li>
              <li>
                <a href="#">Клиент</a>
              </li>
              <li>
                <a href="#">Доставка</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="line"></div>
        <div className="container">
          <div className="main-inner">
            <section className="special-goods-wrapper">
              <div className="section">
                <div className="push60 hidden-xss"></div>
                <div className="push20 visible-xss"></div>
                <div className="box visible">
                  <div className="form-group">
                    <label className="label" htmlFor="public_link">
                      Публичная ссылка{" "}
                      <span>
                        <i
                          style={{ color: "blue", cursor: "pointer" }}
                          className="uil uil-copy"
                          onClick={() => {
                            navigator.clipboard.writeText(inp.current.value);
                          }}
                        ></i>
                      </span>
                    </label>
                    <input
                      ref={inp}
                      style={{ cursor: "text" }}
                      value={publicLink || ""}
                      name="public_link"
                      type="text"
                      className="form-control"
                      disabled
                      id="public_link"
                    />
                  </div>
                  <OrderForm />
                  <div className="push80"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
