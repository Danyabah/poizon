import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { parseSeconds } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setSplit } from "../redux/slices/userReducer";

export default function Timer() {
  const { id } = useParams();
  const [timer, setTimer] = useState(10);
  const [interval, setStateInterval] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      setTimer(res.data.buy_time_remaining);
      console.log(res.data);
      setPrice(res.data.fullprice);
      setStateInterval(
        setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000)
      );
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(interval);
      setTimer(0);
    }
  }, [timer]);

  return timer && location.hash !== "#split" ? (
    <div
      className="timer"
      onClick={() => {
        navigate(`/pay/${id}`);
        dispatch(setSplit(false));
      }}
    >
      <div>
        <b className="timer__seconds">{parseSeconds(timer)}</b>{" "}
      </div>
      <div>Оплатить</div>
      <div>
        <b>{price} ₽</b>
      </div>
    </div>
  ) : (
    <></>
  );
}
