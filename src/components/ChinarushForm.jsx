import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { setChinarushProduct, setReload } from "../redux/slices/adminReducer";

export default function ChinarushForm({ id }) {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.admin.reload);
  const token = useSelector((state) => state.user.token);
  const [linksub, setLinksub] = useState("");

  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/cdek/orders/?im_number=${id}`)
      .then((res) => {
        console.log(res);
        setLinksub(res.data.entity.cdek_number);
      });
  }, [id]);

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
        dispatch(setChinarushProduct(null));
        dispatch(setReload(!reload));
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  console.log(linksub);

  const { mutate } = useMutation({
    mutationFn: () => {
      if (window.confirm("Вы уверены?")) {
        if (linksub) {
          return axios.patch(
            `https://crm-poizonstore.ru/checklist/${id}`,
            {
              status: "chinarush",
              cdek_tracking: linksub,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
        } else {
          return axios.patch(
            `https://crm-poizonstore.ru/checklist/${id}`,
            {
              status: "chinarush",
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
        }
      }
    },
  });

  return (
    <button className="button button-new no-icon" onClick={onSubmit}>
      Доставляется в РФ
    </button>
  );
}
