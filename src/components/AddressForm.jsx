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
  const [coords, setCoords] = useState("");

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

  useEffect(() => {
    let [address, house] = pickup.split(", ");
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=5f800b37-ed0d-4c95-a0ce-b72d8ebf590f&geocode=Санкт-Петербург,${address},${house}&format=json`
      )
      .then((res) => {
        console.log(res.data);

        setCoords(
          res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
            .pos
        );
      })
      .catch((err) => {
        alert("Адрес введен в неверном формате");
      });
  }, [pickup]);

  const initialValues = {
    pickup: pickup || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(setAddress(response.data.pickup));
        alert("Сохранено");
        window.location.reload();
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
                    center: [coords?.split(" ")[1], coords?.split(" ")[0]],
                    zoom: 15,
                  }}
                >
                  <Placemark
                    geometry={[coords?.split(" ")[1], coords?.split(" ")[0]]}
                  />
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
