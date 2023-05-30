import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RequestList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categ, setCateg] = useState("bought");

  const [totalPage, setTotalPage] = useState(1);

  function getProducts() {
    axios
      .get(
        `http://45.84.227.72:5000/checklist/?page=${page}&limit=10&previewimage=no&status=${categ}`
      )
      .then((data) => {
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }
  useEffect(() => {
    getProducts();
  }, [categ, page]);

  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Заявки</div>
          </div>
          <div className="push90 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="container">
            <div className="push40 line hidden-xss"></div>
            <div className="main-inner main-inner-menu">
              <ul className="tabs">
                <li
                  className={categ === "bought" ? "current" : ""}
                  onClick={() => setCateg("bought")}
                >
                  <span>Оплачено</span>
                </li>

                <li
                  className={categ === "buying" ? "current" : ""}
                  onClick={() => setCateg("buying")}
                >
                  <span>Ожидает оплаты</span>
                </li>
              </ul>
            </div>
            <div className="push15 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
          </div>
          <div className="line hidden-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot table request orders">
            <div className="table-row">
              <div className="table-td">
                Номер
                <br /> заявки
              </div>
              <div className="table-td">
                Дата и<br /> время
              </div>
              <div className="table-td">
                Статус
                <br /> заявки
              </div>
            </div>
            {products.map((product) => (
              <div className="table-row" key={product?.id}>
                <div className="table-td">
                  <Link to={`/personalareapay/${product?.id}`}>
                    {product?.id}
                  </Link>
                </div>
                <div className="table-td">{product.currentDate}</div>
                <div className="table-td">
                  {categ === "bought" ? "Оплачено" : "Ожидает оплаты"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="push100 hidden-xss"></div>
        <div className="push30  hidden-xss"></div>
        <div className="push20  visible-xss"></div>
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
