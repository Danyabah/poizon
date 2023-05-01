import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

export default function Alfa() {
  const [alfaInfo, setAlfaInfo] = useState({});
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/payment/`).then((res) => {
      setAlfaInfo(res.data.alfa);
    });
  }, []);

  const initialValues = {
    requisites: alfaInfo?.requisites || "",
    cardnumber: alfaInfo?.cardnumber || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
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
      formPayload.type = "alfa";
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
            <div className="title title-p">Альфабанк</div>
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
                name="cardnumber"
                component="span"
                className="form-control"
              />
            </div>
            <div className="push10"></div>
            <button type="submit" className="button no-icon">
              Сохранить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
