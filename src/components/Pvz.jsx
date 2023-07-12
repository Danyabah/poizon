import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProductInfo,
  setUserInfo,
} from "../redux/slices/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

export default function Pvz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    window.getCdek();
  }, [id]);

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      console.log(res);
      if (typeof res.data["error"] == "undefined") {
        setProduct(res.data);
      }
    });
  }, [id]);

  const initialValues = {
    buyername: "",
    buyersurname: "",
    buyerphone: product.buyerphone || "",
  };

  const onSubmit = (values) => {
    console.log(values);
    let pvz = document.querySelector("#pvz").value;

    if (pvz.trim() === "") {
      alert("Выберите ПВЗ");
      return;
    }
    values.pvz = pvz;
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        console.log(window.delivery_sum);

        navigate(`/orderpageinprogress/${id}`);
      },
      onError: (response) => {
        // alert("Произошла ошибка");
        navigate(`/orderpageinprogress/${id}`);
      },
    });
  };
  // минимум 2 слова !
  const validSchema = Yup.object().shape({
    buyername: Yup.string().required("Необходимо указать имя"),
    buyersurname: Yup.string().required("Необходимо указать фамилию"),
    buyerphone: Yup.string()
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        "Проверьте номер телефона"
      )
      .required("Необходимо указать номер телефона"),
  });
  //   console.log(token);
  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      let { buyername, buyerphone, buyersurname, pvz, address } = formPayload;
      let newObj = {
        type: 1,
        number: product.id,
        tariff_code: "136",
        shipment_point: "SPB81",
        delivery_point: pvz,
        sender: {
          phones: [
            {
              number: "+79992020207",
            },
          ],
        },
        delivery_recipient_cost: {
          value: +window?.delivery_sum + 3.75,
          vat_rate: 6,
        },
        value: 0,
        threshold: 1000000,
        sum: 0,
        recipient: {
          name: `${buyername} ${buyersurname}`,
          phones: [
            {
              number: buyerphone,
            },
          ],
        },
        packages: [
          {
            number: product.id,
            weight: 1200,
            length: 35,
            width: 26,
            height: 14,
            items: [
              {
                name: `${product?.brand} ${product?.model}`,
                ware_key: product.id,
                weight: 1200,
                payment: {
                  value: 0,
                },
                cost: 500,
                amount: 1,
                url: product?.link,
              },
            ],
          },
        ],
      };
      return axios.post(`https://crm-poizonstore.ru/cdek/orders/`, newObj);
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
        return (
          <>
            <Header />
            <div className="line"></div>
            <div className="push60 hidden-xss"></div>
            <div className="push20 visible-xss"></div>
            <section className="main-section">
              <div className="container">
                <div className="main-inner">
                  <div className="title">Заказ #{id}</div>
                  <div className="push20 hidden-xss"></div>
                  <div className="push10 visible-xss"></div>
                  <div className="text">
                    {product?.brand} {product?.model}
                  </div>
                </div>
              </div>
              <div className="push40 hidden-xss"></div>
              <div className="push20 visible-xss"></div>
              <div className="line"></div>
              <div className="push40 hidden-xss"></div>
              <div className="push20 visible-xss"></div>
              <div className="container">
                <div className="main-inner rf">
                  <Form className="order">
                    <div className="push20 hidden-xss"></div>
                    <div className="text">
                      Заполните данные получателя и выберете Пунт Выдачи Заказов
                    </div>
                    <div className="push40 hidden-xss"></div>
                    <div className="push10 visible-xss"></div>
                    <div className="form-group">
                      <label className="label" htmlFor="buyername">
                        <span>*</span>Имя получателя
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
                      <label className="label" htmlFor="buyersurname">
                        <span>*</span>Фамилия получателя
                      </label>
                      <Field
                        name="buyersurname"
                        type="text"
                        required
                        className="required form-control"
                        id="buyersurname"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="buyersurname"
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

                    <input
                      style={{ display: "none" }}
                      name="pvz"
                      type="text"
                      disabled
                      required
                      className=" required form-control"
                      id="pvz"
                    />

                    <div className="text">
                      <b>Выберете Пункт Выдачи Заказов СДЭК</b>
                    </div>
                    <div className="push20 hidden-xss"></div>
                    <div id="forpvz" style={{ height: "500px" }}></div>
                    <div className="push20 hidden-xss"></div>
                    <div className="push5 visible-xss"></div>
                    <div className="form-group">
                      <label className="label" htmlFor="address">
                        <span>*</span>Адрес ПВЗ
                      </label>
                      <Field
                        name="address"
                        type="text"
                        required
                        disabled
                        className=" required form-control"
                        id="address"
                      />
                    </div>
                    <div className="push20 hidden-xss"></div>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="address"
                      component="span"
                      className="form-control"
                    />
                    {/* <div className="push20 hidden-xss"></div>
                    <div className="push5 visible-xss"></div> */}
                    <div className="text">
                      <span>*</span>У некоторых пунктов выдачи СДЭК (ПВЗ) нет
                      возможности доставлять заказы. Если у желаемого ПВЗ нет
                      кнопки "Выбрать", то поищите, пожалуйста, другой ближайший
                      ПВЗ к вам, который доставляет заказы интернет-магазинов.
                    </div>
                    <div className="push20 hidden-xss"></div>
                    <button className="button" type="submit">
                      Сохранить
                    </button>
                  </Form>
                  <div className="push20 hidden-xss"></div>
                  <div className="push5 visible-xss"></div>

                  {/* <input type="text" name="pvz" placeholder="Код ПВЗ" />
                  <input type="text" name="address" placeholder="Адрес ПВЗ" /> */}
                </div>
              </div>
              <div className="push90"></div>
            </section>
          </>
        );
      }}
    </Formik>
  );
}
