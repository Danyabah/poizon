import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/userReducer";

export default function PasswordForm() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  // const dispatch = useDispatch();

  const initialValues = {
    current_password: "",
    new_password: "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
        console.log(response);
        // dispatch(setUserInfo(response.data));
      },
      onError: (response) => {
        console.log(response);
        if (response.response.data.current_password) {
          alert(response.response.data.current_password[0]);
        }
      },
    });
  };

  const validSchema = Yup.object().shape({
    current_password: Yup.string().required("Необходимо указать старый пароль"),
    new_password: Yup.string()
      .min(8, "Пароль должен содержать как минимум 8 символов")
      .required("Необходимо указать новый пароль"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      formPayload.managerid = userInfo.managerid;
      return axios.post(
        `https://crm-poizonstore.ru/users/set_password/`,
        formPayload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
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
              <label className="label" htmlFor="current_password">
                Старый пароль:
              </label>
              <Field
                name="current_password"
                type="text"
                className="form-control"
                id="current_password"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="current_password"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="new_password">
                Новый пароль:
              </label>
              <Field
                name="new_password"
                type="text"
                className="form-control"
                id="new_password"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="new_password"
                component="span"
                className="form-control"
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
