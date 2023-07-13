import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function DeliveryTab() {
  const product = useSelector((state) => state.admin.selectedProduct);

  return (
    <div className="box visible">
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Имя получателя
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${
              product?.recievername ? product?.recievername : product?.buyername
            }`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Телефон получателя
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${
              product?.recieverphone
                ? product?.recieverphone
                : product?.buyerphone
            }`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Тип доставки
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.delivery_display}`}
          />
        </div>

        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>
        {product?.trackid && (
          <div className="form-group">
            <label className="label" htmlFor="sum">
              Трек номер
            </label>
            <input
              name="sum"
              type="text"
              className="form-control"
              id="sum"
              disabled
              value={`${product?.trackid}`}
            />
          </div>
        )}

        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>

        <div className="push90"></div>
      </form>
    </div>
  );
}
