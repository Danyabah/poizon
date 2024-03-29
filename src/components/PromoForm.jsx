import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
export default function PromoForm({ setOpen }) {
  const initialValues = {
    name: "",
    discount: "",
    freedelivery: false,
    nocomission: false,
  };
  const token = useSelector((state) => state.user.token);

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
        setOpen(false);
        console.log(response);
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    name: Yup.string().required("Необходимо указать название промокода"),
    discount: Yup.string().required("Укажите размер скидки в рублях"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.post(`https://crm-poizonstore.ru/promo/`, formPayload, {
        headers: {
          Authorization: `Token ${token}`,
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
          <Form>
            <div className="form-group">
              <label className="label" htmlFor="name">
                Название
              </label>
              <Field
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="name"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="discount">
                Размер скидки в рублях
              </label>
              <Field
                type="text"
                name="discount"
                className="form-control"
                id="discount"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="discount"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <p className="row">
                <label className="label" htmlFor="freedelivery">
                  Бесплатная Доставка
                </label>
                <Field name="freedelivery" type="checkbox" id="freedelivery" />
              </p>
            </div>
            <div className="form-group">
              <p className="row">
                <label className="label" htmlFor="nocomission">
                  Без Комиссии
                </label>
                <Field name="nocomission" type="checkbox" id="nocomission" />
              </p>
            </div>

            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <button type="submit" className="button no-icon">
              Сохранить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
