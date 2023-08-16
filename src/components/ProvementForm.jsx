import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PreviewImage from "./PreviewImage";
import { setCurrentProductInfo } from "../redux/slices/userReducer";
import { useNavigate } from "react-router-dom";

export default function ProvementForm() {
  const paymentmethod = useSelector((state) => state.user.payMethod);
  const product = useSelector((state) => state.user.currentProductInfo);
  const inp = useRef(null);
  const dispatch = useDispatch();
  const [card, setCard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/payment/`).then((res) => {
      setCard(res.data[paymentmethod]);
    });
  }, [paymentmethod]);

  console.log(card);

  const initialValues = {
    paymenttype: paymentmethod || "",
    paymentprovement: [],
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        dispatch(setCurrentProductInfo(response.data));
        navigate(`/order/${response.data.id}`);
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    paymentprovement: Yup.array()
      .min(1, "Добавьте скриншот оплаты")
      .required("Добавьте скриншот оплаты"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(`https://crm-poizonstore.ru/checklist/${product.id}`, {
        status: "payment",
        paymenttype: formPayload.paymenttype,
        paymentprovement: formPayload.paymentprovement,
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
        const { values, setValues, setFieldValue } = formik;
        console.log(values.paymentprovement);
        return (
          <Form className="requisite">
            <div className="form-group">
              <div className="text bold700">Загрузите скриншот оплаты</div>
              <div className="push20"></div>
              <div className="file-input fileInput" id="fileInputWrap">
                <input
                  name="paymentprovement"
                  type="file"
                  id="paymentprovement"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {
                    setFieldValue(
                      "paymentprovement",
                      Array.from(e.target.files)
                    );
                  }}
                />

                {values.paymentprovement.length === 0 && (
                  <label htmlFor="paymentprovement">
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
                name="paymentprovement"
                component="span"
                className="form-control"
              />
              <div className="images-wrapper">
                {values.paymentprovement.length !== 0 && (
                  <PreviewImage
                    name="paymentprovement"
                    setField={setFieldValue}
                    file={values.paymentprovement}
                  />
                )}
              </div>
            </div>
            <div className="requisite-info">
              <div className="text bold700">Реквизиты</div>
              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="text">
                Для оплаты заказа переведите деньги на карту. Комментарий
                оставьте пустым.
              </div>
              <div className="push40 hidden-xss"></div>
              <div className="push20 visible-xss"></div>
              <div className="text bold700">Номер карты</div>
              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="text size">
                <span ref={inp}>
                  {card?.cardnumber?.slice(0, 4)}{" "}
                  {card?.cardnumber?.slice(4, 8)}{" "}
                  {card?.cardnumber?.slice(8, 12)}{" "}
                  {card?.cardnumber?.slice(12, 16)}
                </span>
                <div
                  className="copy"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(inp.current.innerText);
                  }}
                >
                  <svg
                    width="23"
                    height="27"
                    viewBox="0 0 23 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.93005 0.28142C6.12005 0.101031 6.38002 0 6.65002 0H13C15.76 0 18 2.11461 18 4.72222C20.76 4.72222 23 6.83683 23 9.44444V21.7222C23 24.3298 20.76 26.4444 18 26.4444H10C7.24 26.4444 5 24.3298 5 21.7222C2.24 21.7222 0 19.6076 0 17V6.35327C0 6.10488 0.100039 5.86691 0.290039 5.6903L5.93005 0.28142ZM16 4.72222V17C16 18.5649 14.66 19.8333 13 19.8333H5C3.34 19.8333 2 18.5649 2 17V8.5H8C8.55 8.5 9 8.07689 9 7.55556V1.88889H13C14.66 1.88889 16 3.15728 16 4.72222ZM7 1.9512V6.61111H2.14001L7 1.9512ZM10 24.5556C8.34 24.5556 7 23.2872 7 21.7222H13C15.76 21.7222 18 19.6076 18 17V6.61111C19.66 6.61111 21 7.8795 21 9.44444V21.7222C21 23.2872 19.66 24.5556 18 24.5556H10Z"
                      fill="#0081AB"
                    />
                  </svg>
                </div>
              </div>
              <div className="push20 hidden-xss"></div>
              <div className="push10 visible-xss"></div>
              <div className="text">Получатель: {card?.requisites}</div>
            </div>
            <button type="submit" className="button">
              Готово
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
