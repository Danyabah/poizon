import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { stage, status } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function ClientTab() {
  const product = useSelector((state) => state.admin.selectedProduct);

  return (
    <div className="box visible">
      <form>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Имя клиента
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.buyername}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Телефон клиента
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.buyerphone}`}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="sum">
            Телеграмм
          </label>
          <input
            name="sum"
            type="text"
            className="form-control"
            id="sum"
            disabled
            value={`${product?.tg}`}
          />
        </div>
        <div className="push20 hidden-xss"></div>
        <div className="push10 visible-xss"></div>

        <div className="push90"></div>
      </form>
    </div>
  );
}
