import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReload } from "../redux/slices/adminReducer";

export default function Scanning() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState({});
  const reload = useSelector((state) => state.admin.reload);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const token = useSelector((state)=>state.user.token)

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://crm-poizonstore.ru/checklist/?page=${page}&limit=10&status=chinarush&search=${search}`,{ headers:{
          "Authorization": `Token ${token}`
        }}
      )
      .then((data) => {
        console.log(data.data);
        setProducts(data.data.data);
        setTotalPage(data.data.total_pages);
      });
  }, [page, reload, search]);

  function onSubmit() {
    if (window.confirm("Вы уверены?")) {
      try {
        axios
          .patch(`https://crm-poizonstore.ru/checklist/${product?.id}`, {
            status: "rush",
          },{ headers:{
            "Authorization": `Token ${token}`
          }})
          .then(() => {
            setProduct({});

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
            {JSON.stringify(product) !== "{}" && (
              <>
                <div className="text">
                  Заказ #{product?.id}; телефон: {product?.buyerphone}; tg:{" "}
                  {product?.tg}
                </div>
                <div className="push20 hidden-xss"></div>
                <div className="push10 visible-xss"></div>
                <div className="button no-icon scanning" onClick={onSubmit}>
                  Принять на склад
                </div>
                <div className="push60 hidden-xss"></div>
                <div className="push25 visible-xss"></div>
              </>
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="push10 hidden-xss"></div>
            {/* <div className="button no-icon scanning">Поиск</div> */}
          </form>
          <div className="push70 hidden-xss"></div>
          <div className="push15 visible-xss"></div>
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
                <div
                  style={{ cursor: "pointer" }}
                  className="table-td"
                  onClick={() => setProduct(product)}
                >
                  {product?.id.slice(0, 8) + "..."}
                </div>
                <div className="table-td">
                  {product.startDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product.currentDate?.slice(0, 10)}
                </div>
                <div className="table-td">
                  {product.delivery_display && product?.delivery_display?.slice(0, 9) + "..."}
                </div>
                <div className="table-td">{product?.buyerphone}</div>
                <div className="table-td">{product?.buyername}</div>
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
