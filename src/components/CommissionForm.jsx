import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CommisionForm() {
  const [commission, setCommission] = useState(0);
  const [chinadelivery, setChinadelivery] = useState(0);

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/category/`).then((res) => {
      setCommission(res.data.price.commission);
      setChinadelivery(res.data.price.chinadelivery);
    });
  }, []);

  const initialValues = {
    commission: commission || 0,
    chinadelivery: chinadelivery || 0,
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    commission: Yup.number().required("Необходимо указать комиссию"),
    chinadelivery: Yup.number().required(
      "Необходимо указать условия доставки из Китая"
    ),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.post(
        `https://crm-poizonstore.ru/category/price/`,
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
          <Form className="main-inner">
            <div className="title">Комиссия и Стоимость доставки в Китае</div>
            <div className="push40 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="form-group">
              <label className="label" htmlFor="commission">
                Комиссия
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                name="commission"
                type="number"
                className="form-control"
                id="commission"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="commission"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="chinadelivery">
                Стоимость доставки POIZON-Склад в Китае
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                name="chinadelivery"
                type="number"
                className="form-control"
                id="chinadelivery"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="chinadelivery"
                component="span"
                className="form-control"
              />
            </div>
            <div className="push30 visible-xss"></div>
            <button className="button curs" type="submit">
              Сохранить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
