import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

import { useSelector } from "react-redux";
import GiftForm from "../components/GiftForm";

export default function Gift() {
  const [gifts, setGifts] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/gifts/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGifts(res.data);
      });
  }, [open]);

  function tryDelete(id, name) {
    if (window?.confirm(`Вы действительно хотите удалить подарок "${name}"`)) {
      axios
        .delete(`https://crm-poizonstore.ru/gifts/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          window?.location.reload();
        });
    }
  }

  function tryEdit(el) {
    setEdit(el);
    setOpen(true);
  }

  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push10 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <section>
              <div className="section">
                <div className="title-button">
                  <div className="title">Подарки</div>
                  <button
                    className="button no-icon"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    Добавить подарок
                  </button>
                </div>
                <div className="push40 hidden-xss"></div>
                <div className="push20 visible-xss"></div>
                {open && (
                  <GiftForm setOpen={setOpen} edit={edit} setEdit={setEdit} />
                )}
                <div className="push60 hidden-xss"></div>
                <div className="push20 visible-xss"></div>
                <div className="giftss">
                  {gifts.map((pr) => {
                    return (
                      <div className="item gift" key={pr.name}>
                        <div
                          className="del gift-del"
                          onClick={(e) => tryDelete(pr.id, pr.name)}
                        >
                          <svg
                            width="24"
                            height="30"
                            viewBox="0 0 24 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.81681 3.1371C6.81681 1.40437 7.96119 0 9.37312 0H14.4857C15.8977 0 17.042 1.40437 17.042 3.1371V4.1828H23.0067C23.4771 4.1828 23.8588 4.65127 23.8588 5.2285C23.8588 5.80572 23.4771 6.27419 23.0067 6.27419H21.3025V24.0511C21.3025 26.9383 19.3947 29.2796 17.042 29.2796H6.81681C4.46416 29.2796 2.5563 26.9383 2.5563 24.0511V6.27419H0.852102C0.381742 6.27419 0 5.80572 0 5.2285C0 4.65127 0.381742 4.1828 0.852102 4.1828H6.81681V3.1371ZM8.52102 4.1828H15.3378V3.1371C15.3378 2.55987 14.9561 2.0914 14.4857 2.0914H9.37312C8.90276 2.0914 8.52102 2.55987 8.52102 3.1371V4.1828ZM4.26051 6.27419V24.0511C4.26051 25.7838 5.40488 27.1882 6.81681 27.1882H17.042C18.454 27.1882 19.5983 25.7838 19.5983 24.0511V6.27419H4.26051ZM11.9294 9.41129C12.3998 9.41129 12.7815 9.87976 12.7815 10.457V23.0054C12.7815 23.5826 12.3998 24.0511 11.9294 24.0511C11.4591 24.0511 11.0773 23.5826 11.0773 23.0054V10.457C11.0773 9.87976 11.4591 9.41129 11.9294 9.41129Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div>
                          <div>
                            <img className="gift-img" src={pr.image} alt="" />
                          </div>
                          <div className="item-title">
                            <strong>{pr.name}</strong>
                          </div>
                          <div className="item-info">
                            <div>Доступен от: {pr.min_price} ¥</div>
                          </div>
                          <div className="item-info">
                            <div>Количество: {pr.available_count}</div>
                          </div>
                          <div className="push10"></div>
                          <button
                            className="button"
                            onClick={() => tryEdit(pr)}
                          >
                            Изменить
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="push80"></div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
