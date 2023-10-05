import React, { useState } from "react";
import Header from "../components/Header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "../redux/slices/userReducer";

export default function AuthorizationWork() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logClose, setLogClose] = useState(false);
  const [pasClose, setPasClose] = useState(false);
  const [visible, setVisible] = useState(false);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Необходимо указать почту"),
    password: Yup.string().required("Необходимо указать пароль"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        if (!response.data.error) {
          console.log(response);
          dispatch(setToken(response.data.auth_token));
          axios
            .get("https://crm-poizonstore.ru/users/me", {
              headers: {
                Authorization: `Token ${response.data.auth_token}`,
              },
            })
            .then((res) => {
              dispatch(setUserInfo(res.data));
              navigate("/managerpersonalaccount");
            });
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
      return axios.post(
        "https://crm-poizonstore.ru/auth/token/login/",
        formPayload
      );
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => {
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
                    <div
                      className="form-group"
                      style={{ position: "relative" }}
                    >
                      <label className="label" htmlFor="email">
                        Логин
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                          if (e.target.value !== "") {
                            setLogClose(true);
                          } else {
                            setLogClose(false);
                          }
                        }}
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="email"
                        component="span"
                        className="form-control"
                      />
                      {logClose && (
                        <div
                          className="login__close"
                          onClick={() => {
                            setLogClose(false);
                            setFieldValue("email", "");
                          }}
                        >
                          <i class="uil uil-times-square"></i>
                        </div>
                      )}
                    </div>
                    <div
                      className="form-group"
                      style={{ position: "relative" }}
                    >
                      <label className="label" htmlFor="password">
                        Пароль
                      </label>
                      <Field
                        name="password"
                        type={!visible ? "password" : "text"}
                        className="form-control"
                        id="password"
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                          if (e.target.value !== "") {
                            setPasClose(true);
                          } else {
                            setPasClose(false);
                          }
                        }}
                      />
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="password"
                        component="span"
                        className="form-control"
                      />
                      {pasClose && (
                        <div
                          className="login__close"
                          onClick={() => {
                            setPasClose(false);
                            setFieldValue("password", "");
                          }}
                        >
                          <i class="uil uil-times-square"></i>
                        </div>
                      )}
                      {visible ? (
                        <div
                          className="login__close"
                          style={{ right: "32px" }}
                          onClick={() => {
                            setVisible(false);
                          }}
                        >
                          <i class="uil uil-eye"></i>
                        </div>
                      ) : (
                        <div
                          style={{ right: "32px" }}
                          className="login__close"
                          onClick={() => {
                            setVisible(true);
                          }}
                        >
                          <i class="uil uil-eye-slash"></i>
                        </div>
                      )}
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
