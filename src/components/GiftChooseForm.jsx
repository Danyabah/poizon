import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GiftChooseForm({ product }) {
  const [gifts, setGifts] = useState([]);
  const [choose, setChoose] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://crm-poizonstore.ru/gifts?for_price=${product?.curencycurency2}`
      )
      .then((res) => {
        setGifts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product]);

  function handleChoose(el) {
    setChoose(el);
  }

  function onSubmit() {
    axios
      .patch(`https://crm-poizonstore.ru/checklist/${product?.id}`, {
        gift: choose?.id,
      })
      .then((res) => {
        navigate(`/orderpageinprogress/${product?.id}`);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="gifts__container">
        {gifts.map((el) => (
          <div
            className={`gift__item ${
              choose?.id === el?.id ? "gift__item_active" : ""
            }`}
            onClick={() => handleChoose(el)}
          >
            <img src={el?.image} alt="" className="gift__item-img" />
            <div className="gift__item-name">{el?.name}</div>
          </div>
        ))}
      </div>
      {choose && (
        <div className="gifts__btn">
          <div className="push20 hidden-xss"></div>
          <div className="push30 visible-xss"></div>
          <button type="submit" className="button" onClick={onSubmit}>
            Готово
          </button>
        </div>
      )}
    </>
  );
}
