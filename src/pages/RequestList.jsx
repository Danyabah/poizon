import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStyle, parseTg } from "../utils/utils";

export default function RequestList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categ, setCateg] = useState("bought");
  const token = useSelector((state) => state.user.token);
  const [totalPage, setTotalPage] = useState(1);
  const [fullProduct, setFullProduct] = useState(null);

  function getProducts() {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&status=${categ}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
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
                  onClick={() => {
                    setCateg("bought");
                    setFullProduct(null);
                  }}
                >
                  <span>Выкуплено</span>
                </li>

                <li
                  className={categ === "buying" ? "current" : ""}
                  onClick={() => {
                    setCateg("buying");
                    setFullProduct(null);
                  }}
                >
                  <span>Ожидает выкупа</span>
                </li>
              </ul>
            </div>
            <div className="push15 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
          </div>
          <div className="line hidden-xss"></div>
        </div>
        <div className="container">
          {fullProduct && (
            <div className="main-inner img-container">
              <div className="img-preview">
                <a href={fullProduct.previewimage} className="" target="_blank">
                  <img
                    style={{ objectFit: "contain" }}
                    src={fullProduct.previewimage}
                    alt=""
                  />
                </a>
              </div>
              <div>
                <div className="push20"></div>
                <div className="img-text">
                  <b>Заказ:</b> <br /> #{fullProduct?.id}
                </div>
                <div className="img-text">
                  <b>Сплит:</b> <br /> {fullProduct?.split ? "Да" : "Нет"}
                </div>

                <div className="img-text">
                  <b>CNY:</b>
                  <br />
                  {fullProduct?.curencycurency2} CNY
                </div>

                {fullProduct.tg && (
                  <a
                    href={parseTg(fullProduct.tg)}
                    target="_blank"
                    rel="noreferrer"
                    className="img-btn"
                  >
                    Телеграмм
                  </a>
                )}
              </div>

              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
            </div>
          )}
          <div className="check-table depot table request orders">
            <div className="table-row">
              <div className="table-td">Номер</div>
              <div className="table-td">Дата</div>
              <div className="table-td">CNY</div>
              <div className="table-td">Сплит</div>
              <div className="table-td">Товар</div>
            </div>
            {products.map((product) => (
              <div
                className="table-row"
                style={getStyle(fullProduct, product)}
                key={product?.id}
                onClick={() => setFullProduct(product)}
              >
                <div className="table-td">
                  <Link to={`/personalareapay/${product?.id}`}>
                    {product?.id}
                  </Link>
                </div>
                <div className="table-td">
                  {product?.currentDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product?.curencycurency2?.toLocaleString()} ¥
                </div>
                <div className="table-td">{product?.split ? "Да" : "Нет"}</div>
                <div className="table-td">
                  {product?.brand} {product?.model}
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
