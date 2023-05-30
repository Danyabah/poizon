import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Formik, Form } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { setChinarushProduct, setReload } from "../redux/slices/adminReducer";

export default function ChinarushForm({ id }) {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.admin.reload);

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

  const { mutate } = useMutation({
    mutationFn: () => {
      if (window.confirm("Вы уверены?")) {
        return axios.patch(`http://45.84.227.72:5000/checklist/${id}`, {
          status: "chinarush",
        });
      }
    },
  });

  return (
    <button className="button button-new no-icon" onClick={onSubmit}>
      Доставляется в рф
    </button>
  );
}
