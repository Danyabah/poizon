import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function ClientTab() {
  const product = useSelector((state) => state.admin.selectedProduct);
  const nameRef = useRef(null);
  const telRef = useRef(null);
  const tgRef = useRef(null);
  return (
    <div className="box visible">
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Имя клиента
          </label>
          <input
            ref={nameRef}
            name="sum"
            type="text"
            className="form-control copy-control"
            id="sum"
            // disabled
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(nameRef?.current.value);
            }}
            value={`${product?.buyername}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Телефон клиента
          </label>
          <input
            ref={telRef}
            name="sum"
            type="text"
            className="form-control copy-control"
            id="sum"
            readOnly
            // disabled
            onClick={() => {
              navigator.clipboard.writeText(telRef?.current.value);
            }}
            value={`${product?.buyerphone}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Телеграмм
          </label>
          <input
            ref={tgRef}
            name="sum"
            type="text"
            className="form-control copy-control"
            id="sum"
            // disabled
            readOnly
            value={`${product?.tg}`}
            onClick={() => {
              navigator.clipboard.writeText(tgRef?.current.value);
            }}
          />
        </div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>

        <div className="push90"></div>
      </form>
    </div>
  );
}
