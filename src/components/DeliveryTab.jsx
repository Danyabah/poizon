import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { deliveryName, stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function DeliveryTab() {
  const product = useSelector((state) => state.admin.selectedProduct);
  const nameRef = useRef(null);
  const telRef = useRef(null);
  const tgRef = useRef(null);
  return (
    <div className="box visible">
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Имя получателя
          </label>
          <input
            name="sum"
            ref={nameRef}
            type="text"
            className="form-control"
            id="sum"
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(nameRef.current.value);
            }}
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
            // disabled
            ref={telRef}
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(telRef.current.value);
            }}
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
            // disabled
            ref={tgRef}
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(tgRef.current.value);
            }}
            value={`${deliveryName[product?.delivery_display]}`}
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
        {product?.cdek_barcode_pdf && (
          <div className="form-group">
            <a
              href={product.cdek_barcode_pdf}
              className="track button"
              target="_blank"
              rel="noreferrer"
            >
              Распечатать штрихкод
            </a>
          </div>
        )}

        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>

        <div className="push90"></div>
      </form>
    </div>
  );
}
