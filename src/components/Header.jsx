import React, { useEffect, useState } from "react";
import logo from "../utils/logo.PNG";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Header() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const [curs, setCurs] = useState(0);
  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/settings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setCurs(res.data.currency);
      });
  }, []);
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
          <div className="header__curs">
            <span>¥: </span>
            <span>{curs}</span>
            <span> ₽</span>
          </div>
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
