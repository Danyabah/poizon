import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../utils/logo.PNG";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function PersonalAreaCheckPay() {
  const [categ, setCateg] = useState("payment");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function getProducts() {
    axios
      .get(
        `http://45.84.227.72:5000/checklist/?page=${page}&limit=10&previewimage=no&status=${categ}&search=${search}`
      )
      .then((data) => {
        console.log(data.data.data);
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }

  useEffect(() => {
    getProducts();
  }, [page, categ, search]);

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return axios.patch(`http://45.84.227.72:5000/checklist/${values.id}`, {
        status: values.status,
      });
    },
  });

  const onSubmit = (values) => {
    if (window?.confirm("Вы уверены что хотите принять оплату?")) {
      mutate(values, {
        onSuccess: (response) => {
          console.log(response);
          getProducts();
        },
        onError: (response) => {
          alert("Произошла ошибка");
        },
      });
    }
  };

  const onDelete = (id) => {
    if (window?.confirm("Вы уверены что хотите удалить товар?")) {
      axios.delete(`http://45.84.227.72:5000/checklist/${id}`).then((res) => {
        if (res.data.status === "success") {
          alert("Товар успешно удален");
          getProducts();
        }
      });
    }
  };
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
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <form className="search-wrapper">
              <div className="form-group">
                <label className="label" htmlFor="search">
                  Поиск
                </label>
                <input
                  value={search}
                  name="search"
                  type="text"
                  className="form-control"
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
        </div>
        <div className="line hidden-xss"></div>
        <div className="container">
          <div className="push25 hidden-xss"></div>

          <div className="main-inner">
            <ul className="tabs">
              <li
                className={categ === "draft" ? "current" : ""}
                onClick={() => setCateg("draft")}
              >
                <span>Черновик</span>
              </li>
              <li
                className={categ === "neworder" ? "current" : ""}
                onClick={() => setCateg("neworder")}
              >
                <span>Расчет</span>
              </li>
              <li
                className={categ === "payment" ? "current" : ""}
                onClick={() => setCateg("payment")}
              >
                <span>Проверка оплаты</span>
              </li>
              <li
                className={categ === "buying" ? "current" : ""}
                onClick={() => setCateg("buying")}
              >
                <span>На закупке</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="line"></div>
        <div className="check-table table">
          <div className="container">
            <div className="table-row">
              <div className="table-td" style={{ justifyContent: "center" }}>
                Номер
              </div>
              <div className="table-td">Дата</div>
              <div className="table-td">Сумма</div>
              <div className="table-td">Способ оплаты</div>
              <div className="table-td">Место</div>
            </div>
          </div>
          <div className="line hidden-xss"></div>
          <div className="container">
            {products?.map((obj) => (
              <div key={obj?.id} className="table-row">
                {categ === "draft" ? (
                  <div
                    className="table-td"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/personalareaorder/${obj?.id}`)}
                  >
                    {obj?.id}
                  </div>
                ) : (
                  <div
                    className="table-td"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/personalareapay/${obj?.id}`)}
                  >
                    {obj?.id}
                  </div>
                )}
                <div className="table-td">
                  {obj.status === "neworder"
                    ? obj.startDate?.slice(0, 10)
                    : obj.currentDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {obj?.fullprice?.toLocaleString()}
                </div>
                <div className="table-td">
                  Перевод по номеру
                  <br /> карты{" "}
                  {obj?.paymenttype === "tink"
                    ? "Тинькофф"
                    : obj?.paymenttype === "ralf"
                    ? "Райффайзен"
                    : obj?.paymenttype === "alfa"
                    ? "Альфабанк"
                    : ""}
                </div>
                <div className="table-td" style={{ position: "relative" }}>
                  {obj?.delivery}{" "}
                  {obj?.status === "payment" ? (
                    <div className="flex-i">
                      <i
                        className="uil uil-check-circle"
                        onClick={() =>
                          onSubmit({ status: "buying", id: obj?.id })
                        }
                      ></i>
                      <span className="confirm-i">Принять</span>
                    </div>
                  ) : (
                    categ === "draft" && (
                      <span
                        style={{
                          position: "absolute",
                          right: "-35%",
                          top: "35%",
                          fontSize: "35px",
                          color: "#428bca",
                          cursor: "pointer",
                        }}
                      >
                        <i
                          className="uil uil-trash-alt"
                          onClick={() => onDelete(obj?.id)}
                        ></i>
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="line hidden-xss"></div>
        </div>
        <div className="push80 hidden-xss"></div>
        <div className="push55 visible-xss"></div>
        <div className="container">
          <ul className="pagination">
            <li>
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="prev-page"
              >
                {"<"}
              </button>
            </li>
            <li>
              <button className="page">{page}</button>
            </li>
            <li>
              <button
                disabled={page === totalPage}
                className="next-page"
                onClick={() => setPage((prev) => prev + 1)}
              >
                {">"}
              </button>
            </li>
          </ul>
        </div>
        <div className="push80"></div>
      </section>
    </>
  );
}
