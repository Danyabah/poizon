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
import { useNavigate } from "react-router-dom";
export default function UserForm() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.user.currentProductInfo);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");

  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/pickup`).then((res) => {
      setPickup(res.data.pickup);
    });
  }, []);
  console.log(pickup);

  const initialValues = {
    buyername: product.buyername || "",
    buyerphone: product.buyerphone || "",
    tg: product.tg || "",
    delivery: product.delivery || "Самовывоз из шоурума",
    recievername: product.recievername || "",
    recieverphone: product.recieverphone || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        dispatch(setCurrentProductInfo(response.data));
        if (response.data.delivery === "Курьерская доставка CDEK") {
          navigate(`/crrcdek/${response.data.id}`);
        } else if (response.data.delivery === "Пункт выдачи заказов CDEK") {
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
    // + или 8
    buyerphone: Yup.string().required("Необходимо указать номер телефона"),
    delivery: Yup.string().required("Необходимо указать тип доставки"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(
        `http://45.84.227.72:5000/checklist/${product.id}`,
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
              <label className="label" htmlFor="delivery">
                <b>Адрес самовывоза:</b> {pickup}
              </label>
              <Field
                as="select"
                name="delivery"
                required
                className="select-styler form-control required"
                id="delivery"
              >
                <option value="Самовывоз из шоурума">
                  Самовывоз из шоурума
                </option>
                <option value="Пункт выдачи заказов CDEK">
                  Пункт выдачи заказов CDEK
                </option>
                <option value="Курьерская доставка CDEK">
                  Курьерская доставка CDEK
                </option>
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
