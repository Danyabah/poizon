import React from "react";
import { Link } from "react-router-dom";
import PersonalForm from "../components/PersonalForm";
import UserHeader from "../components/UserHeader";
import logo from "../utils/logo.PNG";

export default function PersonalArea() {
  return (
    <div className="lk">
      <header className="header-wrapper">
        <div className="container">
          <div className="header header">
            <Link to={"/managerpersonalaccount"}>
              <img className="img-logo " src={logo} alt="" />
            </Link>
            <div className="buttons-wrapper">
              <Link to="/managerpersonalaccount" className="user">
                <UserHeader />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="line"></div>
      <div className="push60 hidden-xs"></div>
      <div className="push25 visible-xs"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="title">Личный кабинет</div>
            <div className="push60 hidden-xs"></div>
            <div className="push25 visible-xs"></div>
          </div>
          <PersonalForm />
        </div>
      </section>
    </div>
  );
}
