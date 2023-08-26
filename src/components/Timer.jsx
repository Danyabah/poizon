import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { parseSeconds } from "../utils/utils";

export default function Timer() {
  const { id } = useParams();
  const [timer, setTimer] = useState(10);
  const [interval, setStateInterval] = useState(0);
  const location = useLocation();
  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      setTimer(res.data.buy_time_remaining);
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
    <div className="timer">{parseSeconds(timer)}</div>
  ) : (
    <></>
  );
}
