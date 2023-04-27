import React from "react";
import { Link } from "react-router-dom";

export default function PersonalAreaNew() {
  return (
    <>
      <header class="header-wrapper">
        <div class="container">
          <div class="header">
            <div class="logo">POIZON</div>
            <div class="buttons-wrapper">
              <a href="#" class="track button">
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
      <div class="line hidden-xss"></div>
      <form class="main-section">
        <div class="container">
          <div class="push40 line hidden-xss"></div>
          <div class="main-inner main-inner-menu">
            <ul class="tabs">
              <li class="current">
                <Link to="/personalareanew">Новые</Link>
              </li>
              <li>
                <Link to="/personalareapurchase">На закупке</Link>
              </li>
              <li>
                <a href="#">Выкуплен</a>
              </li>
              <li>
                <a href="#">На складе в Китае</a>
              </li>
            </ul>
          </div>
          <div class="push15 hidden-xss"></div>
          <div class="push10 visible-xss"></div>
        </div>
        <div class="line hidden-xss"></div>
        <div class="container">
          <div class="push40  hidden-xss"></div>
          <div class="main-inner">
            <div class="text">Заказ на сумму 837.00 CNY</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <button class="button button-new no-icon">На закупку</button>
          </div>
          <div class="push40 hidden-xss"></div>
          <div class="push20 visible-xss"></div>
        </div>
        <div class="line"></div>
        <div class="order-table table">
          <div class="container">
            <div class="table-row table-row-th">
              <div class="table-td">Заказ</div>
              <div class="table-td">Дата</div>
              <div class="table-td">CNY</div>
              <div class="table-td">Товар</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="container">
            <div class="table-row">
              <div class="table-td">2905</div>
              <div class="table-td">22.10.2022</div>
              <div class="table-td">169.00</div>
              <div class="table-td">Название товара</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="container">
            <div class="table-row">
              <div class="table-td">2906</div>
              <div class="table-td">22.10.2022</div>
              <div class="table-td">109.00</div>
              <div class="table-td">Название товара</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="container">
            <div class="table-row">
              <div class="table-td">2900</div>
              <div class="table-td">22.10.2022</div>
              <div class="table-td">559.00</div>
              <div class="table-td">Название товара</div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="push80 hidden-xss"></div>
        <div class="push20 visible-xss"></div>
        <div class="container">
          <ul class="pagination">
            <li>
              <a href="#" class="prev-page">
                {"<"}
              </a>
            </li>
            <li>
              <a href="#" class="page">
                1
              </a>
            </li>
            <li>
              <a href="#" class="next-page">
                {">"}
              </a>
            </li>
          </ul>
        </div>
        <div class="push60"></div>
      </form>
    </>
  );
}
