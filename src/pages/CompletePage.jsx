import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deliveryName, getStyle, parseTg } from "../utils/utils";
import useFilter from "../utils/useFilter";

export default function CompletePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categ, setCateg] = useState("bought");
  const token = useSelector((state) => state.user.token);
  const [totalPage, setTotalPage] = useState(1);
  const [fullProduct, setFullProduct] = useState(null);

  function getProducts() {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&status=completed`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data.data.data);
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }
  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Доставленные Заказы</div>
          </div>
          <div className="push90 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
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
                  <b>Телефон:</b> <br /> {fullProduct?.buyerphone}
                </div>

                <div className="img-text">
                  <b>Cумма:</b>
                  <br />
                  {fullProduct?.fullprice} ₽
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
                {fullProduct?.cdek_tracking && (
                  <a
                    href={`https://www.cdek.ru/ru/tracking?order_id=${fullProduct?.cdek_tracking}`}
                    target="_blank"
                    rel="noreferrer"
                    className="img-btn img-btn-gr"
                  >
                    Отследить СДЭК
                  </a>
                )}
              </div>

              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
            </div>
          )}
          <div className="check-table depot table request orders">
            <div className="table-row table-row-bold">
              <div className="table-td">Номер</div>
              <div className="table-td">Дата заказа</div>
              <div className="table-td">Дата доставки</div>
              <div className="table-td">Способ доставки</div>
              <div className="table-td">Имя</div>
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
                  {product?.startDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product?.currentDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {deliveryName[product?.delivery_display]}
                </div>
                <div className="table-td">{product?.buyername}</div>
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
                disabled={page === Math.ceil(totalPage / 10)}
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
