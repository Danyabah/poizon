import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Sber() {
  const [sberInfo, setSberInfo] = useState({});
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/payment/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSberInfo(res.data.sber);
      });
  }, []);

  const initialValues = {
    requisites: sberInfo?.requisites || "",
    cardnumber: sberInfo?.cardnumber || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        alert("Сохранено");
        window.location.reload();
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const onDisable = (values) => {
    if (window?.confirm("Вы уверены что хотите отключить карту?")) {
      mutate(values, {
        onSuccess: (response) => {
          console.log(response);
          alert("Отключено");
          window.location.reload();
        },
        onError: (response) => {
          alert("Произошла ошибка");
        },
      });
    }
  };

  const validSchema = Yup.object().shape({
    cardnumber: Yup.string()
      .min(16, "Укажите 16 цифр номера")
      .max(16, "Укажите 16 цифр номера")
      .required("Необходимо указать номер карты"),
    requisites: Yup.string().required("Необходимо указать реквизиты"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      formPayload.type = "sber";
      return axios.patch(`https://crm-poizonstore.ru/payment/`, formPayload, {
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
            <div className="title title-p">Сбербанк</div>
            <div className="push20"></div>
            <div className="form-group">
              <label className="label" htmlFor="requisites">
                Реквизиты
              </label>
              <Field
                name="requisites"
                type="text"
                className=" form-control"
                id="requisites"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="requisites"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="cardnumber">
                Номер карты
              </label>
              <Field
                name="cardnumber"
                type="text"
                className=" form-control"
                id="cardnumber"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="cardnumber"
                component="span"
                className="form-control"
              />
            </div>
            <div className="push10"></div>
            {sberInfo?.cardnumber !== 0 ? (
              <button type="submit" className="button no-icon">
                Сохранить
              </button>
            ) : (
              <button type="submit" className="button no-icon">
                Включить
              </button>
            )}
            <span
              className="button no-icon red"
              onClick={() =>
                onDisable({ type: "sber", cardnumber: 0, requisites: "" })
              }
            >
              Отключить
            </span>
          </Form>
        );
      }}
    </Formik>
  );
}
