import React from "react";
import Header from "../components/Header";
import AddressForm from "../components/AddressForm";

export default function Address() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <AddressForm />
        </div>
        <div className="push80"></div>
      </section>
    </>
  );
}
