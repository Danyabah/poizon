import React from "react";
import Header from "../components/Header";
import Ralf from "../components/Ralf";
import Tink from "../components/Tink";
import Alfa from "../components/Alfa";

export default function PaymentMethod() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner payment-method">
            <div className="title">Способ оплаты</div>
            <div className="push40 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <Ralf />
            <Tink />
            <Alfa />
          </div>
        </div>

        <div className="push100"></div>
      </section>
    </>
  );
}
