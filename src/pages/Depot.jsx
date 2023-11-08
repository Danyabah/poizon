import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deliveryName,
  getStyle,
  notSplitStyle,
  parseTg,
  splitStyle,
} from "../utils/utils";
import useFilter from "../utils/useFilter";

export default function Depot() {
  const [products, setFullProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.user.token);
  const [fullProduct, setFullProduct] = useState(null);

  function renderProducts() {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&status=rush&search=${search}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((data) => {
        setFullProducts(data.data.data);
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
          .patch(
            `https://crm-poizonstore.ru/checklist/${id}`,
            {
              status: "completed",
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then(() => {
            alert("Заказ Доставлен!");
            renderProducts();
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onDelete = (id) => {
    if (window?.confirm("Вы уверены что хотите удалить товар?")) {
      axios
        .delete(`https://crm-poizonstore.ru/checklist/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            alert("Товар успешно удален");
            renderProducts();
          }
        });
    }
  };
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
        </div>
        <div className="container">
          {fullProduct ? (
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
                {!fullProduct?.split && fullProduct.split_payment_proof ? (
                  <div className="img-text">
                    <b>Оплачено полностью</b>
                  </div>
                ) : !fullProduct?.split && fullProduct.paymentprovement ? (
                  <div className="img-text">
                    <b>Оплачено полностью</b>
                  </div>
                ) : (
                  <div className="img-text">
                    <b>Сумма к оплате:</b>
                    <br />
                    {fullProduct.split
                      ? Math.round(fullProduct?.fullprice / 2).toLocaleString()
                      : fullProduct?.fullprice?.toLocaleString()}{" "}
                    ₽
                  </div>
                )}
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
                {fullProduct?.delivery_display === "Самовывоз из шоурума" && (
                  <div
                    className="img-btn img-btn-gr"
                    onClick={() => onSubmit(fullProduct?.id)}
                  >
                    Доставлено
                  </div>
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
                {fullProduct?.cdek_barcode_pdf && (
                  <a
                    href={fullProduct?.cdek_barcode_pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="img-btn img-btn-gr"
                    style={{
                      backgroundColor: "black",
                    }}
                  >
                    Распечатать Штрихкод
                  </a>
                )}
              </div>

              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
            </div>
          ) : (
            <div className="push50"></div>
          )}

          <div className="check-table depot table depot-big">
            <div className="table-row">
              <div className="table-td" style={{ fontWeight: "bold" }}>
                Номер заказа
              </div>
              <div className="table-td" style={{ fontWeight: "bold" }}>
                Дата заказа
              </div>
              <div className="table-td" style={{ fontWeight: "bold" }}>
                Дата приемки
              </div>

              <div
                className="table-td"
                {...useFilter("delivery", products, setFullProducts)}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Способ доставки
              </div>
              <div className="table-td" style={{ fontWeight: "bold" }}>
                Подарок
              </div>
              <div className="table-td" style={{ fontWeight: "bold" }}>
                Имя
              </div>
            </div>
            {products?.map((product) => (
              <div
                key={product?.id}
                className="table-row"
                style={getStyle(fullProduct, product)}
                onClick={() => setFullProduct(product)}
              >
                <div
                  style={
                    product.split && !product?.split_accepted
                      ? splitStyle
                      : notSplitStyle
                  }
                  className="table-td"
                >
                  <Link
                    to={`/personalareapay/${product?.id}/#split`}
                    style={{ color: "black" }}
                  >
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
                  {deliveryName[product.delivery_display]}
                </div>
                <div className="table-td">{product.gift?.name}</div>
                <div className="table-td" style={{ position: "relative" }}>
                  {product?.buyername}

                  <span className="trash">
                    <i
                      className="uil uil-trash-alt"
                      onClick={() => onDelete(product?.id)}
                    ></i>
                  </span>
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
                disabled={page === Math.ceil(totalPage / 10)}
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
