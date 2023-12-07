import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setPaymentCurrency } from "../redux/slices/adminReducer";
import { useDispatch, useSelector } from "react-redux";

export default function CursForm() {
  const [currency, setCurrency] = useState("");
  const [yuan, setYuan] = useState(0);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/settings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setCurrency(res.data.currency);
        setYuan(res.data.yuan_rate_commission);
        dispatch(setPaymentCurrency(res.data.currency));
      });
  }, []);

  const initialValues = {
    yuan_rate_commission: yuan || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        setCurrency(response.data.currency);
        dispatch(setPaymentCurrency(response.data.currency));
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    yuan_rate_commission: Yup.number().required("Необходимо указать комиссию"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(`https://crm-poizonstore.ru/settings/`, formPayload, {
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
          <>
            <Form className="main-inner">
              <div className="title">Курс</div>
              <div className="push40 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="form-group">
                <label className="label" htmlFor="yuan_rate_commission">
                  Рыночный курс ЦБ (RUB/CNY): {currency - yuan}
                </label>
                <label className="label" htmlFor="yuan_rate_commission">
                  Итого курс (RUB/CNY): {currency}
                </label>
                <label className="label" htmlFor="yuan_rate_commission">
                  Наценка на курс
                </label>
                <div className="push10 visible-xss"></div>
                <Field
                  name="yuan_rate_commission"
                  type="number"
                  className="form-control"
                  id="currency"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="yuan_rate_commission"
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
