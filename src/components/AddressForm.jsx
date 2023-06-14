import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setAddress, setPaymentCurrency } from "../redux/slices/adminReducer";
import { useDispatch } from "react-redux";

export default function AddressForma() {
  const [pickup, setPickup] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/pickup`).then((res) => {
      setPickup(res.data.pickup);
      dispatch(setAddress(res.data.pickup));
    });
  }, []);

  const initialValues = {
    pickup: pickup || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(setAddress(response.data.pickup));
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    pickup: Yup.string().required("Необходимо указать адрес"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(`https://crm-poizonstore.ru/pickup/`, formPayload);
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
              <div className="title">Адрес Самовывоза</div>
              <div className="push40 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="form-group">
                <label className="label" htmlFor="pickup">
                  Адрес
                </label>
                <div className="push10 visible-xss"></div>
                <Field
                  name="pickup"
                  type="text"
                  className="form-control"
                  id="pickup"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="pickup"
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
