import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/userReducer";
export default function PersonalForm() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const initialValues = {
    name: userInfo.name || "",
    surname: userInfo.surname || "",
    lastname: userInfo.lastname || "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
        dispatch(setUserInfo(response.data));
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    name: Yup.string().required("Необходимо указать имя"),
    surname: Yup.string().required("Необходимо указать фамилию"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      formPayload.managerid = userInfo.managerid;
      return axios.patch(`http://45.84.227.72:5000/login/`, formPayload);
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
                Имя:
              </label>
              <Field
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="surname">
                Фамилия:
              </label>
              <Field
                name="surname"
                type="text"
                className="form-control"
                id="surname"
              />
              <ErrorMessage
                name="surname"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="lastname">
                Отчество:
              </label>
              <Field
                name="lastname"
                type="text"
                className="form-control"
                id="lastname"
              />
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
