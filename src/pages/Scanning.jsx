import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReload } from "../redux/slices/adminReducer";
import { Link, useLocation } from "react-router-dom";
import {
  addToDraft,
  deliveryName,
  getStyle,
  notSplitStyle,
  parseTg,
  splitStyle,
} from "../utils/utils";
import useFilter from "../utils/useFilter";

export default function Scanning() {
  const [products, setFullProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [fullProduct, setFullProduct] = useState(null);
  const reload = useSelector((state) => state.admin.reload);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.user.token);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&status=chinarush&search=${search}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data.data);

        setFullProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }, [page, reload, search]);

  useEffect(() => {
    if (location.search.slice(13)) {
      setSearch(location.search.slice(13));
    }
  }, [location.search]);

  function onSubmit() {
    if (window.confirm("Вы уверены?")) {
      try {
        axios
          .patch(
            `https://crm-poizonstore.ru/checklist/${fullProduct?.id}`,
            {
              status: "rush",
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then(() => {
            setFullProduct({});

            dispatch(setReload(!reload));
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
          <div className="push25 visible-xss"></div>
          <form className="main-inner">
            {fullProduct ? (
              <>
                <div className="main-inner img-container">
                  <div className="img-preview">
                    <a
                      href={fullProduct.previewimage}
                      className=""
                      target="_blank"
                    >
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
                    {fullProduct?.split && fullProduct.split_payment_proof ? (
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
                          ? Math.round(
                              fullProduct?.fullprice / 2
                            ).toLocaleString()
                          : fullProduct?.fullprice?.toLocaleString()}{" "}
                        ₽
                      </div>
                    )}
                    {fullProduct?.trackid && (
                      <div className="img-text">
                        <b>Трек номер:</b>
                        <br />
                        {fullProduct?.trackid}
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
                  </div>

                  <div className="push20 hidden-xss"></div>
                  <div className="push10 visible-xss"></div>
                </div>
                <div className="button no-icon scanning" onClick={onSubmit}>
                  Принять на склад
                </div>
                <div
                  className="button no-icon scanning"
                  onClick={() => {
                    addToDraft(fullProduct, token);
                  }}
                  style={{
                    marginLeft: "20px",
                    color: "white",
                    backgroundColor: "black",
                    border: "1px solid black",
                  }}
                >
                  Конфисковано
                </div>
                <div className="push60 hidden-xss"></div>
                <div className="push25 visible-xss"></div>
              </>
            ) : (
              <div className="push50"></div>
            )}

            {/* <div className="form-group">
              <label className="label" htmlFor="searchCode">
                Шрих-код
              </label>
              <input
                name="searchCode"
                type="text"
                className="form-control"
                id="searchCode"
              />
            </div> */}
            <div className="form-group">
              <label className="label" htmlFor="searchTrack">
                Трек номер
              </label>
              <input
                value={search}
                name="searchTrack"
                type="text"
                className="form-control"
                id="searchTrack"
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="push10 hidden-xss"></div>
            {/* <div className="button no-icon scanning">Поиск</div> */}
          </form>
          <div className="push70 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot scan table">
            <div className="table-row table-row-bold">
              <div className="table-td">Номер заказа</div>
              <div className="table-td">Дата заказа</div>
              <div className="table-td">В Китае</div>
              <div
                className="table-td"
                {...useFilter("delivery", products, setFullProducts)}
              >
                Доставка
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
                  {deliveryName[product.delivery_display]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="push100"></div>
        <div className="push100"></div>
        <div className="push100"></div>
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
