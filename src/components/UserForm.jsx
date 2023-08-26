import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProductInfo,
  setUserInfo,
} from "../redux/slices/userReducer";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { useNavigate } from "react-router-dom";
export default function UserForm() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.user.currentProductInfo);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [width, setWidth] = useState("320px");
  const [height, setHeight] = useState("240px");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/settings`).then((res) => {
      setPickup(res.data.pickup);
    });

    if (window.innerWidth > 1200) {
      setWidth("550px");
      setHeight("350px");
    } else if (window.innerWidth > 630) {
      setWidth("400px");
      setHeight("250px");
    }
  }, []);

  console.log(pickup);

  const initialValues = {
    buyername: product.buyername || "",
    buyerphone: product.buyerphone || "",
    tg: product.tg || "",
    delivery: product.delivery || "pickup",
    recievername: product.recievername || "",
    recieverphone: product.recieverphone || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        dispatch(setCurrentProductInfo(response.data));
        if (response.data.delivery_display === "Курьерская доставка CDEK") {
          navigate(`/crrcdek/${response.data.id}`);
        } else if (
          response.data.delivery_display === "Пункт выдачи заказов CDEK"
        ) {
          navigate(`/pvz/${response.data.id}`);
        } else {
          navigate(`/orderpageinprogress/${response.data.id}`);
        }
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    buyername: Yup.string().required("Необходимо указать имя"),
    buyerphone: Yup.string()
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        "Проверьте номер телефона"
      )
      .required("Необходимо указать номер телефона"),
    delivery: Yup.string().required("Необходимо указать тип доставки"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      if (!formPayload.tg) {
        formPayload.tg = null;
      }
      if (!formPayload.recievername) {
        formPayload.recievername = null;
      }
      if (!formPayload.recieverphone) {
        formPayload.recieverphone = null;
      }
      return axios.patch(
        `https://crm-poizonstore.ru/checklist/${product.id}`,
        formPayload
      );
    },
  });

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { setFieldValue } = formik;
        return (
          <Form className="order">
            <div className="form-group">
              <label className="label" htmlFor="buyername">
                <span>*</span>Как к вам обращаться?
              </label>
              <Field
                name="buyername"
                type="text"
                required
                className="required form-control"
                id="buyername"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="buyername"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="buyerphone">
                <span>*</span>Телефон WhatsApp
              </label>
              <Field
                name="buyerphone"
                type="text"
                required
                className=" required form-control"
                id="buyerphone"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="buyerphone"
                component="span"
                className="form-control"
              />
            </div>
            <div className="push20 hidden-xss"></div>
            <div className="text">
              Если по заказу возникнут вопросы, то по номеру телефона мы поймем
              чей заказ и оперативно созвонимся. Не рассылаем SMS-спам и не
              звоним с рекламой.
            </div>
            <div className="push40 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="form-group">
              <label className="label" htmlFor="tg">
                Telegram
              </label>
              <Field name="tg" type="text" className="form-control" id="tg" />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="delivery">
                <span>*</span>Тип доставки
              </label>

              {isActive && (
                <>
                  <label className="label" htmlFor="delivery">
                    <b>Адрес самовывоза:</b> {pickup}
                  </label>
                  <div className="map">
                    <Map
                      style={{ width: width, height: height }}
                      defaultState={{
                        center: [59.923725, 30.297219],
                        zoom: 15,
                      }}
                    >
                      <Placemark geometry={[59.923725, 30.297219]} />
                    </Map>
                  </div>
                </>
              )}

              <Field
                as="select"
                name="delivery"
                required
                className="select-styler form-control required"
                id="delivery"
                onChange={(e) => {
                  if (e.target.value === "pickup") {
                    setIsActive(true);
                  } else {
                    setIsActive(false);
                  }
                  setFieldValue("delivery", e.target.value);
                }}
              >
                <option value="pickup">Самовывоз из шоурума</option>
                <option value="cdek">Пункт выдачи заказов СДЭК</option>
                <option value="cdek_courier">Курьерская доставка СДЭК</option>
              </Field>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="recievername">
                ФИО получателя
              </label>
              <Field
                name="recievername"
                type="text"
                className=" form-control"
                id="recievername"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="recieverphone">
                Телефон получателя
              </label>
              <Field
                name="recieverphone"
                type="text"
                className=" form-control"
                id="recieverphone"
              />
            </div>
            <div className="push20 hidden-xss"></div>
            <div className="push5 visible-xss"></div>
            <button className="button" type="submit">
              Сохранить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
