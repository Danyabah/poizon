import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setChinaProduct,
  setChinarushProduct,
  setOrderProduct,
} from "../redux/slices/adminReducer";
import PurchaseForm from "../components/PurchaseForm";
import { useMutation } from "@tanstack/react-query";
import logo from "../utils/logo.PNG";
import ChinaForm from "../components/ChinaForm";
import { addToDraft } from "../utils/utils";
import ChinarushForm from "../components/ChinarushForm";

export default function PersonalAreaNew() {
  const [categ, setCateg] = useState("buying");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const product = useSelector((state) => state.admin.orderProduct);
  const chinaProduct = useSelector((state) => state.admin.chinaProduct);
  const chinarushProduct = useSelector((state) => state.admin.chinarushProduct);
  const reload = useSelector((state) => state.admin.reload);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  function getProducts() {
    axios
      .get(
        `http://45.84.227.72:5000/checklist/?page=${page}&limit=10&previewimage=no&status=${categ}&search=${search}`
      )
      .then((data) => {
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }

  useEffect(() => {
    getProducts();
  }, [page, reload, categ, search]);

  function changeProduct(obj) {
    switch (categ) {
      case "buying":
        dispatch(setOrderProduct(obj));
        break;
      case "bought":
        dispatch(setChinaProduct(obj));
        break;
      case "china":
        dispatch(setChinarushProduct(obj));
        break;
      default:
        break;
    }
  }

  console.log(categ);
  console.log(chinarushProduct);
  console.log(products);
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
      <div className="line hidden-xss"></div>
      <div className="main-section">
        <div className="container">
          <div className="push40 line hidden-xss"></div>
          <div className="main-inner main-inner-menu">
            <ul className="tabs">
              <li
                className={categ === "buying" ? "current" : ""}
                onClick={() => setCateg("buying")}
              >
                <span>Новые</span>
              </li>
              <li className={categ === 2 ? "current" : ""}>
                <span>На закупке</span>
              </li>
              <li
                className={categ === "bought" ? "current" : ""}
                onClick={() => setCateg("bought")}
              >
                <span>Выкуплен</span>
              </li>
              <li
                className={categ === "china" ? "current" : ""}
                onClick={() => setCateg("china")}
              >
                <span>На складе в китае</span>
              </li>
            </ul>
          </div>
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
          <div className="push15 hidden-xss"></div>
          <div className="push10 visible-xss"></div>
        </div>
        <div className="line hidden-xss"></div>
        {categ === 2 ? (
          <PurchaseForm setCateg={setCateg} />
        ) : (
          <>
            <div className="container">
              <div className="push40  hidden-xss"></div>
              {product && categ === "buying" && (
                <div className="main-inner">
                  <div className="text">
                    Заказ #{product?.id} на сумму {product?.curencycurency2} CNY
                  </div>
                  <div className="push20 hidden-xss"></div>
                  <div className="push10 visible-xss"></div>
                  <button
                    className="button button-new no-icon"
                    onClick={() => setCateg(2)}
                  >
                    На закупку
                  </button>
                  <div
                    className="button button-new no-icon"
                    style={{ marginLeft: "20px", backgroundColor: "#62b0ca" }}
                    onClick={() => addToDraft(product)}
                  >
                    Отменить заказ
                  </div>
                </div>
              )}
              {chinaProduct && categ === "bought" && (
                <div className="main-inner">
                  <div className="text">
                    Заказ #{chinaProduct?.id} на сумму{" "}
                    {chinaProduct?.curencycurency2} CNY
                  </div>
                  <div className="push20 hidden-xss"></div>
                  <div className="push10 visible-xss"></div>
                  <ChinaForm id={chinaProduct?.id} />
                </div>
              )}
              {chinarushProduct && categ === "china" && (
                <div className="main-inner">
                  <div className="text">
                    Заказ #{chinarushProduct?.id} на сумму{" "}
                    {chinarushProduct?.curencycurency2} CNY
                  </div>
                  <div className="push20 hidden-xss"></div>
                  <div className="push10 visible-xss"></div>
                  <ChinarushForm id={chinarushProduct?.id} />
                </div>
              )}
              <div className="push40 hidden-xss"></div>
              <div className="push20 visible-xss"></div>
            </div>
            <div className="line"></div>
            <div className="order-table table">
              <div className="container">
                <div className="table-row table-row-th">
                  <div className="table-td">Заказ</div>
                  <div className="table-td">Дата покупки</div>
                  <div className="table-td">CNY</div>
                  <div className="table-td">Товар</div>
                  <div className="table-td">Трек номер</div>
                </div>
              </div>
              <div className="line"></div>
              {products?.map((obj) => (
                <div key={obj?.id}>
                  <div className="container">
                    <div className="table-row">
                      <div
                        className="table-td"
                        style={{ cursor: "pointer" }}
                        onClick={() => changeProduct(obj)}
                      >
                        {obj?.id}
                      </div>
                      <div className="table-td">
                        {obj.startDate?.slice(0, 10)}
                      </div>
                      <div className="table-td">
                        {obj?.curencycurency2?.toLocaleString()}
                      </div>
                      <div className="table-td">
                        {obj?.brand} {obj?.model}
                      </div>
                      <div className="table-td">{obj?.trackid}</div>
                    </div>
                  </div>
                  <div className="line"></div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="push80 hidden-xss"></div>
        <div className="push20 visible-xss"></div>
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
      </div>
    </>
  );
}
