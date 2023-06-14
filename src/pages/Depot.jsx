import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Depot() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  function renderProducts() {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&previewimage=no&status=rush&search=${search}`
      )
      .then((data) => {
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }

  useEffect(() => {
    renderProducts();
  }, [page, search]);

  function onSubmit(id) {
    if (window.confirm("Вы уверены?")) {
      try {
        axios
          .patch(`https://crm-poizonstore.ru/checklist/${id}`, {
            status: "completed",
          })
          .then(() => {
            alert("Заказ Доставлен!");
            renderProducts();
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Склад</div>
            <div className="push30 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <form className="search-wrapper">
              <div className="form-group">
                <label className="label" htmlFor="search">
                  Поиск
                </label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  type="text"
                  className="form-control"
                  id="search"
                />
              </div>
            </form>
          </div>
          <div className="push50"></div>
        </div>
        <div className="container">
          <div className="check-table depot table">
            <div className="table-row">
              <div className="table-td">Номер заказа</div>
              <div className="table-td">Дата заказа</div>
              <div className="table-td">Дата приемки</div>
              <div className="table-td">Способ доставки</div>
              <div className="table-td">Телефон</div>
              <div className="table-td">Имя</div>
            </div>
            {products?.map((product) => (
              <div key={product?.id} className="table-row">
                <div style={{ cursor: "pointer" }} className="table-td">
                  <Link to={`/personalareapay/${product?.id}`}>
                    {product?.id.slice(0, 8) + "..."}
                  </Link>
                </div>
                <div className="table-td">
                  {product.startDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product.currentDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product.delivery && product?.delivery?.slice(0, 9) + "..."}
                </div>
                <div className="table-td">{product?.buyerphone}</div>
                <div className="table-td" style={{ position: "relative" }}>
                  {product?.buyername}
                  {product?.delivery === "Самовывоз из шоурума" && (
                    <div className="flex-i-2">
                      {" "}
                      <i
                        className="uil uil-check-circle"
                        onClick={() => onSubmit(product?.id)}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="push100 hidden-xss"></div>
        <div className="push30"></div>
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
        <div className="push60"></div>
      </section>
    </>
  );
}
