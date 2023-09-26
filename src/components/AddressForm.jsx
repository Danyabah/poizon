import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setAddress, setPaymentCurrency } from "../redux/slices/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import { Map, Placemark } from "@pbe/react-yandex-maps";

export default function AddressForma() {
  const [pickup, setPickup] = useState("");
  const token = useSelector((state) => state.user.token);
  const [width, setWidth] = useState("320px");
  const [height, setHeight] = useState("240px");
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/settings`).then((res) => {
      setPickup(res.data.pickup);

      dispatch(setAddress(res.data.pickup));

      if (window.innerWidth > 1200) {
        setWidth("550px");
        setHeight("350px");
      } else if (window.innerWidth > 630) {
        setWidth("400px");
        setHeight("250px");
      }
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
              <div className="map">
                <Map
                  style={{ width: width, height: height }}
                  defaultState={{
                    center: [59.923725, 30.297219],
                    zoom: 15,
                  }}
                >
                  <Placemark geometry={[59.923725, 30.297219]} />
                </Map>
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
