import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PreviewImage from "./PreviewImage";
import { setOrderProduct, setReload } from "../redux/slices/adminReducer";

export default function PurchaseForm({ setCateg }) {
  const product = useSelector((state) => state.admin.orderProduct);
  const reload = useSelector((state) => state.admin.reload);
  const dispatch = useDispatch();

  const initialValues = {
    realprice: 0,
    checkphoto: [],
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        dispatch(setReload(!reload));
        setCateg("bought");
        dispatch(setOrderProduct(null));
      },
      onError: (response) => {
        console.log(response);
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    realprice: Yup.number()
      .min(1, "Необходимо указать фактическую цену")
      .required("Необходимо указать фактическую цену"),
    checkphoto: Yup.array()
      .min(1, "Добавьте изображение чека")
      .required("Добавьте изображение чека"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      if (window?.confirm("Вы уверены?")) {
        return axios.patch(
          `https://crm-poizonstore.ru/checklist/${product?.id}`,
          {
            status: "bought",
            realprice: formPayload.realprice,
            checkphoto: formPayload.checkphoto[0],
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
        return (
          <div className="container">
            <div className="push40 hidden-xss"></div>
            <div className="title">
              {product?.brand} {product?.model}
            </div>
            <a
              className="text"
              href={product?.link}
              rel="noreferrer"
              target="_blank"
            >
              Ссылка
            </a>
            <div className="push40 hidden-xss"></div>
            <Form className="main-inner">
              <div className="button-wrapper purchase">
                <button className="button no-icon" type="submit">
                  Закуплено
                </button>
                <div
                  className="button no-icon"
                  onClick={() => setCateg("buying")}
                >
                  Отменить закупку
                </div>
              </div>
              <div className="push40 hidden-xss"></div>
              <div className="push20 visible-xss"></div>
              <div className="form-group">
                <label className="label" htmlFor="realprice">
                  Фактическая цена CNY
                </label>
                <Field
                  name="realprice"
                  type="text"
                  className="form-control"
                  id="realprice"
                />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="realprice"
                  component="span"
                  className="form-control"
                />
              </div>

              <div className="push10 visible-xss"></div>
              <div className="label">Изображения чеков закупки</div>
              <div className="push10 hidden-xss"></div>
              <div className="img-wrapper-purchase" id="purchase-check"></div>
              <div className="form-group check">
                <div className="file-input fileInput" id="checkphoto">
                  <input
                    onChange={(e) => {
                      setFieldValue("checkphoto", Array.from(e.target.files));
                    }}
                    type="file"
                    id="checkphoto"
                    accept="image/jpeg,image/png,image/gif"
                    name="checkphoto"
                  />

                  <div className="images-wrapper">
                    {values.checkphoto.length !== 0 && (
                      <PreviewImage
                        name="checkphoto"
                        setField={setFieldValue}
                        file={values.checkphoto}
                      />
                    )}
                  </div>

                  <label htmlFor="checkphoto" className="button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H13C13.41 1.25 13.75 1.59 13.75 2C13.75 2.41 13.41 2.75 13 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18 8.75C17.9 8.75 17.81 8.73 17.71 8.69C17.43 8.58 17.25 8.3 17.25 8V2C17.25 1.59 17.59 1.25 18 1.25C18.41 1.25 18.75 1.59 18.75 2V6.19L19.47 5.47C19.76 5.18 20.24 5.18 20.53 5.47C20.82 5.76 20.82 6.24 20.53 6.53L18.53 8.53C18.39 8.67 18.2 8.75 18 8.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18.0004 8.74994C17.8104 8.74994 17.6204 8.67994 17.4704 8.52994L15.4704 6.52994C15.1804 6.23994 15.1804 5.75994 15.4704 5.46994C15.7604 5.17994 16.2404 5.17994 16.5304 5.46994L18.5304 7.46994C18.8204 7.75994 18.8204 8.23994 18.5304 8.52994C18.3804 8.67994 18.1904 8.74994 18.0004 8.74994Z"
                        fill="#292D32"
                      />
                      <path
                        d="M2.66977 19.7001C2.42977 19.7001 2.18977 19.5801 2.04977 19.3701C1.81977 19.0301 1.90977 18.5601 2.25977 18.3301L7.18977 15.0201C8.26977 14.2901 9.75977 14.3801 10.7398 15.2101L11.0698 15.5001C11.5698 15.9301 12.4198 15.9301 12.9098 15.5001L17.0698 11.9301C18.1298 11.0201 19.7998 11.0201 20.8698 11.9301L22.4998 13.3301C22.8098 13.6001 22.8498 14.0701 22.5798 14.3901C22.3098 14.7001 21.8398 14.7401 21.5198 14.4701L19.8898 13.0701C19.3898 12.6401 18.5398 12.6401 18.0398 13.0701L13.8798 16.6401C12.8198 17.5501 11.1498 17.5501 10.0798 16.6401L9.74977 16.3501C9.28977 15.9601 8.52977 15.9201 8.01977 16.2701L3.08977 19.5801C2.95977 19.6601 2.80977 19.7001 2.66977 19.7001Z"
                        fill="#292D32"
                      />
                    </svg>
                    Добавить фото
                  </label>
                </div>
              </div>
              <div className="push40 hidden-xss"></div>
              <ErrorMessage
                style={{ color: "red" }}
                name="checkphoto"
                component="span"
                className="form-control"
              />
              <div className="push20 visible-xss"></div>
              {/* <div className="label">Изображение со склада</div>
              <div className="push10 hidden-xss"></div>
              <div className="img-wrapper-purchase" id="purchase-depot"></div>
              <div className="form-group check">
                <div className="file-input fileInput" id="fileInputDepot">
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/jpeg,image/png,image/gif"
                    name="fileInputDepot[]"
                  />
                  <label htmlFor="fileInput" className="button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H13C13.41 1.25 13.75 1.59 13.75 2C13.75 2.41 13.41 2.75 13 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18 8.75C17.9 8.75 17.81 8.73 17.71 8.69C17.43 8.58 17.25 8.3 17.25 8V2C17.25 1.59 17.59 1.25 18 1.25C18.41 1.25 18.75 1.59 18.75 2V6.19L19.47 5.47C19.76 5.18 20.24 5.18 20.53 5.47C20.82 5.76 20.82 6.24 20.53 6.53L18.53 8.53C18.39 8.67 18.2 8.75 18 8.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18.0004 8.74994C17.8104 8.74994 17.6204 8.67994 17.4704 8.52994L15.4704 6.52994C15.1804 6.23994 15.1804 5.75994 15.4704 5.46994C15.7604 5.17994 16.2404 5.17994 16.5304 5.46994L18.5304 7.46994C18.8204 7.75994 18.8204 8.23994 18.5304 8.52994C18.3804 8.67994 18.1904 8.74994 18.0004 8.74994Z"
                        fill="#292D32"
                      />
                      <path
                        d="M2.66977 19.7001C2.42977 19.7001 2.18977 19.5801 2.04977 19.3701C1.81977 19.0301 1.90977 18.5601 2.25977 18.3301L7.18977 15.0201C8.26977 14.2901 9.75977 14.3801 10.7398 15.2101L11.0698 15.5001C11.5698 15.9301 12.4198 15.9301 12.9098 15.5001L17.0698 11.9301C18.1298 11.0201 19.7998 11.0201 20.8698 11.9301L22.4998 13.3301C22.8098 13.6001 22.8498 14.0701 22.5798 14.3901C22.3098 14.7001 21.8398 14.7401 21.5198 14.4701L19.8898 13.0701C19.3898 12.6401 18.5398 12.6401 18.0398 13.0701L13.8798 16.6401C12.8198 17.5501 11.1498 17.5501 10.0798 16.6401L9.74977 16.3501C9.28977 15.9601 8.52977 15.9201 8.01977 16.2701L3.08977 19.5801C2.95977 19.6601 2.80977 19.7001 2.66977 19.7001Z"
                        fill="#292D32"
                      />
                    </svg>
                    Добавить фото
                  </label>
                </div>
              </div> */}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
