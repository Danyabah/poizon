import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { stage } from "../utils/utils";

export default function SplitPayment() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      console.log(res);
      setProduct(res.data);
    });
  }, []);
  return stage[product.status] === 6 &&
    product.split &&
    !product.split_payment_proof ? (
    <div className="split__payment">
      <div className="split__text">
        Вам необходимо оплатить вторую часть суммы заказа
      </div>
      <Link
        to={`/pay/${id}#split`}
        style={{ gridGap: "10px" }}
        className="button no-icon split-btn"
      >
        <span className="split__btn" style={{ display: "block" }}>
          Оплатить <strong>{Math.round(product?.fullprice / 2)} ₽</strong>
        </span>
      </Link>
    </div>
  ) : (
    <></>
  );
}
