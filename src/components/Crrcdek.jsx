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

export default function Crrcdek() {
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
 
  const [isLoading, setIsLoading] = useState(true);

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
    city: "",
    street: "",
    house: "",
    flat: "",
  };

  function countDelivery(values) {
    axios
      .post(
        `https://crm-poizonstore.ru/cdek/calculator/tariff/`,
        {
          type: "1",
          currency: "1",
          lang: "rus",
          tariff_code: "137",
          from_location: {
            code: 137,
          },
          to_location: {
            address: `г. ${values.city}, ${values.street}, д. ${values.house}, кв. ${values.flat}`,
          },
          packages: [
            {
              weight: 1200,
              length: 35,
              width: 26,
              height: 14,
            },
          ],
        }
      )
      .then((res) => {
        console.log(res);
        setDelivery(res.data.delivery_sum);
        setIsLoading(false);
      });
  }

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
    buyersurname: Yup.string().required("Необходимо указать фамилию"),
    buyerphone: Yup.string()
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        "Проверьте номер телефона"
      )
      .required("Необходимо указать номер телефона"),
    city: Yup.string().required("Необходимо указать адрес доставки"),
    street: Yup.string().required("Необходимо указать адрес доставки"),
    house: Yup.string().required("Необходимо указать адрес доставки"),
    flat: Yup.string().required("Необходимо указать адрес доставки"),
  });
  //   console.log(token);
  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      let { buyername, buyerphone, buyersurname, city, street, house, flat } =
        formPayload;
      let newObj = {
        type: 1,
        number: product.id,
        tariff_code: "137",
        shipment_point: "SPB81",
        sender: {
          phones: [
            {
              number: "+79992020207",
            },
          ],
        },
        delivery_recipient_cost: {
          value: +delivery + 3.75,
          vat_rate: 6,
        },
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
        to_location: {
          address: `г. ${city}, ${street}, д. ${house}, кв. ${flat}`,
        },
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
        const { isValid, values } = formik;
        console.log(values);
        if (isValid) {
          countDelivery(values);
        }
        console.log(isValid);
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
                    <button
                      className="button button-crr"
                      disabled={isLoading}
                      type="submit"
                    >
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
