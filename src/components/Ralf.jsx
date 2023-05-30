import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

export default function Ralf() {
  const [ralfInfo, setRalfInfo] = useState({});
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/payment/`).then((res) => {
      setRalfInfo(res.data.ralf);
    });
  }, []);

  const initialValues = {
    requisites: ralfInfo?.requisites || "",
    cardnumber: ralfInfo?.cardnumber || "",
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
      formPayload.type = "ralf";
      return axios.post(`http://45.84.227.72:5000/payment/`, formPayload);
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
            <div className="title title-p">Райффайзен Банк</div>
            <div className="push20 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
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
            {ralfInfo?.cardnumber !== 0 ? (
              <button type="submit" className="button no-icon">
                Сохранить
              </button>
            ) : (
              <button type="submit" className="button no-icon">
                Включить
              </button>
            )}
            <span
              className="button no-icon"
              onClick={() =>
                onDisable({ type: "ralf", cardnumber: 0, requisites: "" })
              }
              style={{
                backgroundColor: "#DC143C",
                color: "white",
                marginLeft: "10px",
              }}
            >
              Отключить
            </span>
          </Form>
        );
      }}
    </Formik>
  );
}
