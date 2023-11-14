import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import PreviewImage from "./PreviewImage";
export default function GiftForm({ setOpen, edit, setEdit }) {
  const initialValues = {
    name: edit?.name || "",
    min_price: edit?.min_price || "",
    image: [edit?.image] || "",
  };
  const token = useSelector((state) => state.user.token);

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
        setOpen(false);
        setEdit(null);
        console.log(response);
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    name: Yup.string().required("Необходимо указать название подарка"),
    min_price: Yup.number().required("Укажите от какой суммы доступен подарок"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      if (edit) {
        return axios.patch(
          `https://crm-poizonstore.ru/gifts/${edit?.id}`,
          { ...formPayload, image: formPayload.image[0] },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        return axios.post(
          `https://crm-poizonstore.ru/gifts/`,
          { ...formPayload, image: formPayload.image[0] },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
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
        const { values, setValues, setFieldValue } = formik;
        console.log(values);
        return (
          <Form>
            <div className="form-group">
              <label className="label" htmlFor="name">
                Название
              </label>
              <Field
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="name"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="min_price">
                Доступен от (¥):
              </label>
              <Field
                type="number"
                name="min_price"
                className="form-control"
                id="min_price"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="min_price"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <div className="text bold700">Загрузите изображение подарка</div>
              <div className="push20"></div>
              <div
                className="file-input fileInput gift-img-cont"
                id="fileInputWrap"
              >
                <input
                  name="image"
                  type="file"
                  id="image"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {
                    setFieldValue("image", Array.from(e.target.files));
                  }}
                />

                {(values.image === "" || values.image.length == 0) && (
                  <label htmlFor="image">
                    <svg
                      width="28"
                      height="27"
                      viewBox="0 0 28 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.293 0.276958C13.683 -0.0923195 14.317 -0.0923195 14.707 0.276958L20.707 5.94363C21.098 6.31196 21.098 6.91068 20.707 7.27901C20.317 7.64829 19.683 7.64829 19.293 7.27901L15 3.22454V19.8335C15 20.3549 14.552 20.778 14 20.778C13.448 20.778 13 20.3549 13 19.8335V3.22454L8.70697 7.27901C8.31697 7.64829 7.68303 7.64829 7.29303 7.27901C6.90203 6.91068 6.90203 6.31196 7.29303 5.94363L13.293 0.276958ZM1 16.0558C1.552 16.0558 2 16.4789 2 17.0002V21.7224C2 23.2874 3.343 24.5558 5 24.5558H23C24.657 24.5558 26 23.2874 26 21.7224V17.0002C26 16.4789 26.448 16.0558 27 16.0558C27.552 16.0558 28 16.4789 28 17.0002V21.7224C28 24.33 25.761 26.4447 23 26.4447H5C2.239 26.4447 0 24.33 0 21.7224V17.0002C0 16.4789 0.448 16.0558 1 16.0558Z"
                        fill="black"
                      />
                    </svg>
                    Загрузить фото
                  </label>
                )}
              </div>
              <div className="push50 hidden-xss"></div>
              <ErrorMessage
                style={{ color: "red" }}
                name="image"
                component="span"
                className="form-control"
              />
              <div className="images-wrapper">
                {values.image !== "" && (
                  <PreviewImage
                    name="image"
                    setField={setFieldValue}
                    file={values.image}
                  />
                )}
              </div>
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
