import React, { useRef } from "react";
import OrderForm from "../components/OrderForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../utils/logo.PNG";

export default function PersonalAreaOrder() {
  const publicLink = useSelector((state) => state.admin.publicLink);
  const previewimage = useSelector((state) => state.admin.previewimage);
  const inp = useRef(null);
  return (
    <>
      <header className="header-wrapper">
        <div className="container">
          <div className="header">
            <div className="logo">
              {" "}
              <Link to={"/managerpersonalaccount"}>
                <img className="img-logo " src={logo} alt="" />
              </Link>
            </div>

            <div className="buttons-wrapper">
              <Link to="/personalareaorder" className="track button">
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
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div>
        <img src="" alt="" />
      </div>
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
                <a href="#">Заказ</a>
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
                        <svg
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => {
                            navigator.clipboard.writeText(inp?.current.value);
                          }}
                          width="23"
                          height="27"
                          viewBox="0 0 23 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.93005 0.28142C6.12005 0.101031 6.38002 0 6.65002 0H13C15.76 0 18 2.11461 18 4.72222C20.76 4.72222 23 6.83683 23 9.44444V21.7222C23 24.3298 20.76 26.4444 18 26.4444H10C7.24 26.4444 5 24.3298 5 21.7222C2.24 21.7222 0 19.6076 0 17V6.35327C0 6.10488 0.100039 5.86691 0.290039 5.6903L5.93005 0.28142ZM16 4.72222V17C16 18.5649 14.66 19.8333 13 19.8333H5C3.34 19.8333 2 18.5649 2 17V8.5H8C8.55 8.5 9 8.07689 9 7.55556V1.88889H13C14.66 1.88889 16 3.15728 16 4.72222ZM7 1.9512V6.61111H2.14001L7 1.9512ZM10 24.5556C8.34 24.5556 7 23.2872 7 21.7222H13C15.76 21.7222 18 19.6076 18 17V6.61111C19.66 6.61111 21 7.8795 21 9.44444V21.7222C21 23.2872 19.66 24.5556 18 24.5556H10Z"
                            fill="#0081AB"
                          />
                        </svg>
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
                  <div className="form-group">
                    <div className="img-preview">
                      <a
                        href={`data:image/jpg;base64,${previewimage}`}
                        className=""
                        target="_blank"
                      >
                        <img
                          style={{ objectFit: "contain" }}
                          src={`data:image/jpg;base64,${previewimage}`}
                          alt=""
                        />
                      </a>
                    </div>
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
