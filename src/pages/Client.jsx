import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Client() {
  const [id, setId] = useState("");

  const navigate = useNavigate();
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
                  Номер заказа
                </label>
                <input
                  value={id}
                  name="link"
                  type="text"
                  className="form-control"
                  id="link"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="push10 visible-xss"></div>
              <button
                className="button no-icon enter"
                onClick={() => navigate(`/orderpageinprogress/${id}`)}
              >
                Отслеживать
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
