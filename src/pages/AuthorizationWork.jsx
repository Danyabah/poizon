import React from "react";
import Header from "../components/Header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/userReducer";

export default function AuthorizationWork() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInSchema = Yup.object().shape({
    login: Yup.string().email().required("Необходимо указать почту"),
    password: Yup.string().required("Необходимо указать пароль"),
  });

  const initialValues = {
    login: "",
    password: "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        if (!response.data.error) {
          dispatch(setUserInfo(response.data));
          navigate("/managerpersonalaccount");
        } else {
          alert("Пользователь не найден");
        }

        console.log(response.data);
        // navigate("/login");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.post("https://crm-poizonstore.ru/login/", formPayload);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <Header />
            <div className="line"></div>
            <div className="push45 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <section className="main-section">
              <div className="container">
                <div className="main-inner">
                  <div className="title">Авторизируйтесь</div>
                  <div className="push20"></div>
                </div>
              </div>
              <div className="container">
                <div className="main-inner">
                  <Form>
                    <div className="form-group">
                      <label className="label" htmlFor="email">
                        Логин
                      </label>
                      <Field
                        name="login"
                        type="email"
                        className="form-control"
                        id="login"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="login"
                        component="span"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="password">
                        Пароль
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="password"
                        component="span"
                        className="form-control"
                      />
                    </div>
                    <div className="push15 visible-xss"></div>
                    <button type="submit" className="button no-icon enter">
                      Войти
                    </button>
                  </Form>
                </div>
              </div>
            </section>
          </>
        );
      }}
    </Formik>
  );
}
