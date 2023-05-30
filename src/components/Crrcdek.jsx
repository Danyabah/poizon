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
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

export default function Crrcdek() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/checklist/${id}`).then((res) => {
      console.log(res);
      if (typeof res.data["error"] == "undefined") {
        setProduct(res.data);
      }
    });
    axios
      .post(
        "https://api.edu.cdek.ru/v2/oauth/token?client_id=EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI&client_secret=PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG&grant_type=client_credentials"
      )
      .then((res) => {
        setToken(res.data.access_token);
      });
  }, [id]);

  const initialValues = {
    buyername: product.buyername || "",
    buyerphone: product.buyerphone || "",
    city: "",
    street: "",
    house: "",
    flat: "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);

        navigate(`/orderpageinprogress/${id}`);
      },
      onError: (response) => {
        // alert("Произошла ошибка");
        navigate(`/orderpageinprogress/${id}`);
      },
    });
  };

  const validSchema = Yup.object().shape({
    buyername: Yup.string().required("Необходимо указать имя"),
    buyerphone: Yup.string().required("Необходимо указать номер телефона"),
    city: Yup.string().required("Необходимо указать адрес доставки"),
    street: Yup.string().required("Необходимо указать адрес доставки"),
    house: Yup.string().required("Необходимо указать адрес доставки"),
    flat: Yup.string().required("Необходимо указать адрес доставки"),
  });
  //   console.log(token);
  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      let { buyername, buyerphone, city, street, house, flat } = formPayload;
      let newObj = {
        type: 1,
        number: product.id,
        tariff_code: "137",
        shipment_point: "SPB34",
        value: 0,
        threshold: 1000000,
        sum: 0,
        recipient: {
          name: buyername,
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
            length: 350,
            width: 260,
            height: 140,
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
        to_location: {
          address: `г. ${city}, ${street}, д. ${house}, кв. ${flat}`,
        },
      };
      return axios.post(`https://api.edu.cdek.ru/v2/orders`, newObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
                      Подтвердите ваши данные и укажите адрес для Курьерской
                      доставки CDEK
                    </div>
                    <div className="push40 hidden-xss"></div>
                    <div className="push10 visible-xss"></div>
                    <div className="form-group">
                      <label className="label" htmlFor="buyername">
                        <span>*</span>Как к вам обращаться? (ФИО)
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
                    <div className="form-group">
                      <label className="label" htmlFor="city">
                        <span>*</span>Город
                      </label>
                      <Field
                        name="city"
                        type="text"
                        required
                        className=" required form-control"
                        id="city"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="city"
                        component="span"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="street">
                        <span>*</span>Улица
                      </label>
                      <Field
                        name="street"
                        type="text"
                        required
                        className=" required form-control"
                        id="street"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="street"
                        component="span"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="house">
                        <span>*</span>Дом
                      </label>
                      <Field
                        name="house"
                        type="text"
                        required
                        className=" required form-control"
                        id="house"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="house"
                        component="span"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="city">
                        <span>*</span>Квартира
                      </label>
                      <Field
                        name="flat"
                        type="text"
                        required
                        className=" required form-control"
                        id="flat"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="flat"
                        component="span"
                        className="form-control"
                      />
                    </div>

                    <div className="push20 hidden-xss"></div>
                    <div className="push5 visible-xss"></div>
                    <button className="button" type="submit">
                      Сохранить
                    </button>
                  </Form>
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
