import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setPaymentCurrency } from "../redux/slices/adminReducer";
import { useDispatch } from "react-redux";

export default function CursForm() {
  const [currency, setCurrency] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/currency/`).then((res) => {
      setCurrency(res.data.currency);
      dispatch(setPaymentCurrency(res.data.currency));
    });
  }, []);

  const initialValues = {
    currency: currency || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(setPaymentCurrency(response.data.currency));
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    currency: Yup.number().required("Необходимо указать курс"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(`https://crm-poizonstore.ru/currency/`, formPayload);
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
            <Form className="main-inner">
              <div className="title">Курс</div>
              <div className="push40 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="form-group">
                <label className="label" htmlFor="curs">
                  Курс RUB/CNY
                </label>
                <div className="push10 visible-xss"></div>
                <Field
                  name="currency"
                  type="number"
                  className="form-control"
                  id="currency"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="currency"
                  component="span"
                  className="form-control"
                />
              </div>
              <div className="push30 visible-xss"></div>
              <button className="button curs" type="submit">
                Сохранить
              </button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
