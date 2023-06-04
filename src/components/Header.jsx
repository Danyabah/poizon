import React from "react";
import logo from "../utils/logo.PNG";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <header className="header-wrapper">
      <div className="container">
        <div className="header">
          {userInfo?.job !== "" ? (
            <Link to={"/managerpersonalaccount"}>
              <img className="img-logo " src={logo} alt="" />
            </Link>
          ) : (
            <>
              <img className="img-logo " src={logo} alt="" />
            </>
          )}
          <div className="links__social">
            <a href="https://poizon-store.ru" rel="noreferrer" target="_blank">
              <i className="uil uil-store"></i>
            </a>
            <a href=" https://t.me/poizoning" rel="noreferrer" target="_blank">
              <i className="uil uil-telegram-alt"></i>
            </a>
            <a
              href="https://instagram.com/poizondewu?igshid=YmMyMTA2M2Y="
              rel="noreferrer"
              target="_blank"
            >
              <i className="uil uil-instagram"></i>
            </a>
            <a
              href=" https://vk.com/poizoning"
              rel="noreferrer"
              target="_blank"
            >
              <i className="uil uil-vk-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
