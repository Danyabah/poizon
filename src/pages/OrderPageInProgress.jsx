import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import axios from "axios";
import { setCurrentProductInfo } from "../redux/slices/userReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules

export default function OrderPageInProgress() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [date, setDate] = useState(0);
  const [pickup, setPickup] = useState("");
  const [sdekStatus, setSdekStatus] = useState("");
  const [delCost, setDelCost] = useState("");
  const [linksub, setLinksub] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      console.log(res);
      setProduct(res.data);
      dispatch(setCurrentProductInfo(res.data));
    });

    axios.get(`https://crm-poizonstore.ru/pickup`).then((res) => {
      setPickup(res.data.pickup);
    });

    axios
      .get(`https://crm-poizonstore.ru/cdek/orders/?im_number=${id}`)
      .then((res) => {
        console.log(res);
        setLinksub(res.data.entity.cdek_number)
        setDelCost(res.data.entity.delivery_recipient_cost.value)
        setSdekStatus(
          res.data.entity.statuses[res.data.entity.statuses.length - 1].code
        );
      });
  }, [id]);

  useEffect(() => {
    if (product.startDate && product.currentDate) {
      let dmyStart = product.startDate?.slice(0, 10).split(".");
      let hmStart = product.startDate?.slice(11).split(":");

      let [dayStart, monthStart, yearStart] = dmyStart;
      let [hourStart, minuteStart, secondStart] = hmStart;

      let dmyEnd = product.currentDate?.slice(0, 10).split(".");
      let hmEnd = product.currentDate?.slice(11).split(":");

      let [dayEnd, monthEnd, yearEnd] = dmyEnd;
      let [hourEnd, minuteEnd, secondEnd] = hmEnd;

      let dateStart = new Date(
        yearStart,
        monthStart - 1,
        dayStart,
        hourStart,
        minuteStart
      );

      let dateEnd = new Date(yearEnd, monthEnd - 1, dayEnd, hourEnd, minuteEnd);

      let timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // setDate(diffDays);

      const titles = ["День", "Дня", "Дней"];
      const cases = [2, 0, 1, 1, 1, 2];
      let str = `${
        titles[
          diffDays % 100 > 4 && diffDays % 100 < 20
            ? 2
            : cases[diffDays % 10 < 5 ? diffDays % 10 : 5]
        ]
      }`;

      setDate(`${diffDays} ${str}`);
    }
  }, [product]);

  return (
    <>
      <Header />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="text">Статус: {status[product?.status]}</div>
            <div className="push40 hidden-xss"></div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {product?.image?.length !== 0 && (
                <>
                  <SwiperSlide key={0}>
                    <img
                      src={product?.previewimage}
                      alt=""
                    />
                  </SwiperSlide>
                  {product?.image?.map((img, index) => {
                    if (index > 0) {
                      return (
                        <SwiperSlide key={index}>
                          <img src={img} alt="" />
                        </SwiperSlide>
                      );
                    }
                  })}
                </>
              )}
            </Swiper>
            <div className="push20 visible-xss"></div>
            <div className="push40 hidden-xss"></div>
            <div className="title">
              {product?.brand} {product?.model}
            </div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="text">
              {product?.subcategory}, размер {product?.size}
            </div>
            <div className="push10 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
        
            <a
              className="text"
              href={product?.link}
              rel="noreferrer"
              target="_blank"
            >
              <b>  Ссылка на товар</b>
            
            </a>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="price">
              {product?.fullprice?.toLocaleString()} ₽
            </div>
            <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div
              onClick={() => setVisible((prev) => !prev)}
              className={visible ? `more-wrapper more-wrapper-active` : `more-wrapper`}
              style={{ cursor: "pointer" }}
            >
              Подробности расчета
            </div>
            <div>
              <div className="push30 hidden-xss"></div>
              <div className="table-wrapper">
                {visible && (
                  <table style={{marginTop:"20px"}}>
                    <tbody>
                      <tr>
                        <th>Цена в CNY</th>
                        <td>{product?.curencycurency2?.toLocaleString()} ¥</td>
                      </tr>
                      <tr>
                        <th>Курс обмена</th>
                        <td>{product?.currency?.toLocaleString()} ₽</td>
                      </tr>
                      <tr>
                        <th>Цена в RUB</th>
                        <td>{product?.currency3?.toLocaleString()} ₽</td>
                      </tr>
                      <tr>
                        <th>Доставка по Китаю</th>
                        <td>{product?.chinadelivery?.toLocaleString()} ₽</td>
                      </tr>
                      <tr>
                        <th>Доставка в РФ</th>
                        <td>{product?.chinadelivery2?.toLocaleString()} ₽</td>
                      </tr>
                      <tr>
                        <th>Комиссия сервиса</th>
                        <td>{product?.commission?.toLocaleString()} ₽</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div className="text">Способ доставки: {product?.delivery_display}</div>
           { delCost && <b>Стоимость доставки: {delCost} ₽</b>}
           <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
           {linksub && <div><b><a rel={"noreferrer"} target="_blank" href={`https://www.cdek.ru/ru/tracking?order_id=${linksub}`}>Отследить заказ в CDEK</a></b></div>}
            <div className="push20 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
            {product?.delivery === "Самовывоз из шоурума" && (
              <div className="text">Адрес самовывоза: {pickup}</div>
            )}
            <div className="push35 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            {stage[product?.status] < 6 &&
              product?.delivery === "Самовывоз из шоурума" && (
                <Link to={"/order"} className="change">
                  Изменить данные доставки
                </Link>
              )}
            <div className="push40 hidden-xss"></div>
            <div className="push25 visible-xss"></div>
            <section>
              <div className="history-wrap">
                <div className="title">История заказа</div>
                <div className="push60 hidden-xss"></div>
                <div className="push10 visible-xss"></div>
                <div className="text">
                  В этом разделе мы показываем, где сейчас ваш заказ. Обычно до
                  России заказы доходят за три недели.
                </div>
                <div className="push50 hidden-xss"></div>
                <div className="push30 visible-xss"></div>
                <ul>
                  <li
                    className={`text ${
                      stage[product?.status] === 1
                        ? "current"
                        : stage[product?.status] > 1
                        ? "ready"
                        : ""
                    }`}
                  >
                    Проверка оплаты
                    <ul>
                      <li>
                        <a
                          href={product?.paymentprovement}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Чек об оплате
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] > 1 ? "ready" : ""
                    }`}
                  >
                    Оплачен
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] === 2
                        ? "current"
                        : stage[product?.status] > 1
                        ? "ready"
                        : ""
                    }`}
                  >
                    На закупке
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] === 3
                        ? "current"
                        : stage[product?.status] > 2
                        ? "ready"
                        : ""
                    }`}
                  >
                    Закуплен
                    <ul>
                      <li>
                        Цена закупки: {product?.realprice?.toLocaleString()} CNY
                      </li>
                      <li>
                        <a
                          href={product?.checkphoto}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Чек закупки №1
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">Чек закупки №2</a>
                      </li> */}
                    </ul>
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] === 4
                        ? "current"
                        : stage[product?.status] > 3
                        ? "ready"
                        : ""
                    }`}
                  >
                    На складе в Китае
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] === 5
                        ? "current"
                        : stage[product?.status] > 4
                        ? "ready"
                        : ""
                    }`}
                  >
                    Отправлено на склад в РФ
                  </li>
                  <li
                    className={`text ${
                      stage[product?.status] === 6
                        ? "current"
                        : stage[product?.status] > 5
                        ? "ready"
                        : ""
                    }`}
                  >
                    На складе в РФ
                  </li>
                  {product?.delivery !== "Самовывоз из шоурума" && (
                    <li
                      className={`text ${
                        stage[product?.status] === 7 || stage[sdekStatus] === 7
                          ? "current"
                          : stage[product?.status] > 6 || stage[sdekStatus] > 6
                          ? "ready"
                          : ""
                      }`}
                    >
                      Доставляется
                    </li>
                  )}
                  <li
                    className={`text ${
                      stage[product?.status] === 8 || stage[sdekStatus] === 8
                        ? "current"
                        : stage[product?.status] > 7 || stage[sdekStatus] > 7
                        ? "ready"
                        : ""
                    }`}
                  >
                    Доставлено {product.status === "completed" && `за: ${date}`}
                  </li>
                </ul>
                {product.status === "completed" && (
                  <div className="text">
                    Спасибо большое за заказ! Были бы Вам очень благодарны, если
                    сможете оставить небольшой отзыв с фото в диалоге{" "}
                    <b>
                      {" "}
                      <a
                        href="https://t.me/noziop"
                        rel="noreferrer"
                        target="_blank"
                      >
                        телеграм нашего менеджера
                      </a>
                    </b>
                    .<br />
                    <div className="push25 hidden-xss"></div>
                    <div className="push15 visible-xss"></div>
                    За отзыв с фото даем скидку <b>150₽</b> на следующий заказ.
                  </div>
                )}
                {product.status === "rush" &&
                  product.delivery === "Самовывоз из шоурума" && (
                    <div className="text">
                      <b>
                        Пожалуйста, предупредите нашего {""}
                        <a
                          href="https://t.me/noziop"
                          rel="noreferrer"
                          target="_blank"
                        >
                          менеджера в телеграм {""}
                        </a>
                        за час до того, как будете выезжать за посылкой на наш
                        склад.
                      </b>
                      <br />
                    </div>
                  )}
              </div>
            </section>
            <div className="push100"></div>
            <div className="push100"></div>
          </div>
        </div>
      </section>
    </>
  );
}
