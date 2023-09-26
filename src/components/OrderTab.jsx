import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function OrderTab() {
  const { id } = useParams();
  const inp = useRef(null);

  const product = useSelector((state) => state.admin.selectedProduct);
  const publicLink = `${window.location.origin}/${
    stage[product?.status] > 1 ? "orderpageinprogress" : "orderpage"
  }/${product.id}`;

  const byteString = product?.previewimage;

  return (
    <div className="box visible">
      <form>
        <div className="form-group">
          <label className="label" htmlFor="public_link">
            Публичная ссылка{" "}
            <span>
              <svg
                className="svg-link"
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(inp?.current.value);
                }}
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
            </span>
          </label>
          <input
            ref={inp}
            style={{ cursor: "text" }}
            value={publicLink || ""}
            name="public_link"
            type="text"
            className="form-control"
            disabled
            id="public_link"
          />
        </div>
        {product?.comment && (
          <div className="form-group">
            <label className="label" htmlFor="sum">
              Комментарий
            </label>
            <input
              name="sum"
              type="text"
              className="form-control"
              id="sum"
              onClick={() => {
                navigator.clipboard.writeText(product?.comment);
              }}
              disabled
              value={`${product?.comment}`}
            />
          </div>
        )}
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Название товара
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            onClick={() => {
              navigator.clipboard.writeText(product.brand);
            }}
            disabled
            value={`${product?.brand} ${product?.model}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Размер
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.size}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Цена в CNY
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.curencycurency2?.toLocaleString()} ¥`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Курс обмена
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.currency?.toLocaleString()} ₽`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Цена в RUB
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.currency3?.toLocaleString()} ₽`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Доставка по Китаю
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.chinadelivery?.toLocaleString()} ₽`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Доставка в РФ
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.chinadelivery2?.toLocaleString()} ₽`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Комиссия сервиса
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.chinadelivery2?.toLocaleString()} ₽`}
          />
        </div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        <div className="title-img">Превью товара</div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        <div className="img-wrapper">
          <div class="item-img">
            <a
              href={byteString}
              className="absolute fancybox"
              target="_blank"
            ></a>
            <img style={{ objectFit: "contain" }} src={byteString} alt="" />
          </div>
        </div>

        <div className="push90"></div>
      </form>
    </div>
  );
}
