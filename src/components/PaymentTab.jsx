import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addToDraft, stage, status, translatePay } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import waiting from "../utils/wait.png";

export default function PaymentTab() {
  const { id } = useParams();
  const product = useSelector((state) => state.admin.selectedProduct);
  const reload = useSelector((state) => state.admin.reload);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);

  const { mutate } = useMutation({
    mutationFn: (values) => {
      if (window.confirm("вы уверены?")) {
        return axios.patch(
          `https://crm-poizonstore.ru/checklist/${id}`,
          values,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
    },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);

        window.location.reload();
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };
  return (
    <div className="box visible">
      {(stage[product?.status] > 1 && !product.split) ||
      (stage[product?.status] > 1 &&
        stage[product?.status] < 5 &&
        product.split) ? (
        <div className="button-wrapper">
          <button
            style={{ backgroundColor: "#eee", border: "none" }}
            disabled
            className="button no-icon"
          >
            Оплачено
          </button>
        </div>
      ) : (
        (product.status === "payment" ||
          (product.status === "rush" && product.split)) && (
          <div className="button-wrapper">
            <button
              className="button no-icon"
              onClick={() =>
                product.split && location.hash === "#split"
                  ? onSubmit({ split: false })
                  : onSubmit({ status: "buying" })
              }
            >
              Принять оплату
            </button>
            <button
              className="button no-icon"
              onClick={() => addToDraft(product, token)}
            >
              Отклонить оплату
            </button>
          </div>
        )
      )}

      <div className="push40 hidden-xss"></div>
      <div className="push10 visible-xss"></div>
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Сумма к оплате{" "}
            {product.split ? <strong>(ОПЛАТА СПЛИТОМ)</strong> : <></>}
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={
              product.split
                ? Math.round(product?.fullprice / 2).toLocaleString()
                : product?.fullprice?.toLocaleString()
            }
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="type">
            Тип оплаты
          </label>
          <input
            name="type"
            disabled
            type="text"
            className="form-control"
            value={translatePay[product?.paymenttype]}
            id="type"
          />
        </div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        <div className="title-img">Изображение чеков оплаты покупателем</div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        {product?.split && <b>Чек оплаты №1</b>}
        <div className="img-wrapper">
          <div className="item-img">
            <a
              href={product?.paymentprovement}
              className="absolute fancybox"
              target="_blank"
            ></a>
            <img src={product?.paymentprovement} />
          </div>
        </div>
        <div className="push50"></div>

        {product?.split_payment_proof && (
          <>
            <b>Чек оплаты №2</b>
            <div className="img-wrapper">
              <div className="item-img">
                <a
                  href={product?.split_payment_proof}
                  className="absolute fancybox"
                  target="_blank"
                ></a>
                <img src={product?.split_payment_proof} />
              </div>
            </div>
            <div className="push90"></div>
          </>
        )}
      </form>
    </div>
  );
}
