import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function PaymentTab() {
  const { id } = useParams();
  const product = useSelector((state) => state.admin.selectedProduct);

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return axios.patch(`http://45.84.227.72:5000/checklist/${id}`, values);
    },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        alert("Сохранено");
        window.location.reload();
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };
  return (
    <div className="box visible">
      {stage[product?.status] > 1 ? (
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
        <div className="button-wrapper">
          <button
            className="button no-icon"
            onClick={() => onSubmit({ status: "buying" })}
          >
            Принять оплату
          </button>
          <button className="button no-icon">Отклонить оплату</button>
        </div>
      )}

      <div className="push40 hidden-xss"></div>
      <div className="push10 visible-xss"></div>
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Сумма к оплате
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={product?.fullprice?.toLocaleString()}
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
            value={product?.paymenttype}
            id="type"
          />
        </div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        <div className="title-img">Изображение чека оплаты покупателем</div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
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
        <div className="push90"></div>
      </form>
    </div>
  );
}
