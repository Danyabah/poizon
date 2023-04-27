import React from "react";
import Header from "../components/Header";
import CursForm from "../components/CursForm";
import CommisionForm from "../components/CommissionForm";
import CategoryForm from "../components/CategoryForm";

export default function Curs() {
  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <CursForm />
          <div className="push60 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <CommisionForm />
          <div className="push60 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <CategoryForm />
        </div>
        <div className="push80"></div>
      </section>
    </>
  );
}
