import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import axios from "axios";
import { setCurrentProductInfo } from "../redux/slices/userReducer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, A11y } from "swiper";
import SplitPayment from "../components/SplitPayment";

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

    axios.get(`https://crm-poizonstore.ru/settings`).then((res) => {
      setPickup(res.data.pickup);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/cdek/orders/?im_number=${id}`)
      .then((res) => {
        console.log(res);
        setLinksub(res.data.entity.cdek_number);
        setDelCost(res.data.entity.delivery_recipient_cost.value);
        console.log(product?.status);
        if (stage[product.status] <= 6) {
          setSdekStatus(
            res.data.entity.statuses.find(
              (el) => el.code === "READY_FOR_SHIPMENT_IN_SENDER_CITY"
            )?.code
          );
          console.log(sdekStatus);
        } else {
          console.log(sdekStatus);
          setSdekStatus(
            res.data.entity.statuses.find((el) => el.code === "DELIVERED")?.code
          );
        }
      });
  }, [product]);

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
      <SplitPayment />
      <div className="line"></div>
      <div className="push60 hidden-xss"></div>
      <div className="push20 visible-xss"></div>
      <section className="main-section">
        <div className="container">
          <div className="main-inner">
            <div className="text status__text">
              Статус: {status[product?.status]}
            </div>
            <div className="push40 hidden-xss"></div>
            <Swiper
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {product?.image?.length !== 0 && (
                <>
                  <SwiperSlide key={0}>
                    <img src={product?.previewimage} alt="" />
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

            <div className="title">{product?.category?.name}</div>
            <div className="push10 hidden-xss"></div>
            <div className="push5 visible-xss"></div>

            <a
              className="text"
              href={product?.link}
              rel="noreferrer"
              target="_blank"
            >
              <b> Ссылка на товар</b>
            </a>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="price">
              {product?.fullprice?.toLocaleString()} ₽
            </div>
            {product?.split && <b>Оплачен в сплит</b>}
            <div className="push30 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div
              onClick={() => setVisible((prev) => !prev)}
              className={
                visible ? `more-wrapper more-wrapper-active` : `more-wrapper`
              }
              style={{ cursor: "pointer" }}
            >
              Подробности расчета
            </div>
            <div>
              <div className="push30 hidden-xss"></div>
              <div className="table-wrapper">
                {visible && (
                  <table style={{ marginTop: "20px" }}>
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
            <div className="text">
              Способ доставки: {product?.delivery_display}
            </div>
            {delCost && <b>Стоимость доставки: {delCost} ₽</b>}
            <div className="push30 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
            {linksub && (
              <div>
                <b>
                  <a
                    rel={"noreferrer"}
                    className="cdek__track"
                    target="_blank"
                    href={`https://www.cdek.ru/ru/tracking?order_id=${linksub}`}
                  >
                    Отследить заказ в СДЭК
                  </a>
                </b>
              </div>
            )}
            <div className="push20 hidden-xss"></div>

            {product?.delivery === "pickup" && (
              <div className="text">Адрес самовывоза: {pickup}</div>
            )}
            <div className="push35 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            {stage[product?.status] < 6 && product?.delivery === "pickup" ? (
              <Link to={"/order"} className="change">
                Изменить данные доставки
              </Link>
            ) : product?.delivery === "cdek" ? (
              <Link to={`/pvz/${product?.id}#edit`} className="change">
                Изменить адрес ПВЗ
              </Link>
            ) : product?.delivery === "cdek_courier" ? (
              <Link to={`/crrcdek/${product?.id}#edit`} className="change">
                Изменить адрес доставки
              </Link>
            ) : (
              <></>
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

                <ul className="pzn__statuses">
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 1
                        ? "current"
                        : stage[product?.status] > 1
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span> Проверка оплаты</span>
                  </li>
                  <li
                    className={`pzn__status pzn__status-text ${
                      stage[product?.status] > 1 ? "ready" : ""
                    }`}
                  >
                    <span>
                      {" "}
                      <a
                        href={product?.paymentprovement}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Чек об оплате
                      </a>{" "}
                    </span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] > 1 ? "ready" : ""
                    }`}
                  >
                    <span>Оплачен</span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 2
                        ? "current"
                        : stage[product?.status] > 1
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span> На закупке</span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 3
                        ? "current"
                        : stage[product?.status] > 2
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span>Закуплен</span>
                  </li>
                  <li
                    className={`pzn__status pzn__status-text ${
                      stage[product?.status] > 2 ? "ready" : ""
                    }`}
                  >
                    <span>
                      Цена закупки: {product?.realprice?.toLocaleString()} CNY
                    </span>
                  </li>
                  <li
                    className={`pzn__status pzn__status-text ${
                      stage[product?.status] > 2 ? "ready" : ""
                    }`}
                  >
                    <span>
                      <a
                        href={product?.checkphoto}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Чек закупки №1
                      </a>
                    </span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 4
                        ? "current"
                        : stage[product?.status] > 3
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span>На складе в Китае</span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 5
                        ? "current"
                        : stage[product?.status] > 4
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span>Отправлено на склад в РФ</span>
                  </li>
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 6 && stage[sdekStatus] !== 7
                        ? "current"
                        : stage[product?.status] > 5
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span> На складе в РФ</span>
                  </li>
                  {product?.delivery !== "Самовывоз из шоурума" && (
                    <li
                      className={`pzn__status ${
                        stage[product?.status] === 7 || stage[sdekStatus] === 7
                          ? "current"
                          : stage[product?.status] > 6 || stage[sdekStatus] > 6
                          ? "ready"
                          : ""
                      }`}
                    >
                      <span>Доставляется</span>
                    </li>
                  )}
                  <li
                    className={`pzn__status ${
                      stage[product?.status] === 8 || stage[sdekStatus] === 8
                        ? "current"
                        : stage[product?.status] > 7 || stage[sdekStatus] > 7
                        ? "ready"
                        : ""
                    }`}
                  >
                    <span>
                      {" "}
                      Доставлено{" "}
                      {product.status === "completed" && `за: ${date}`}
                    </span>
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
