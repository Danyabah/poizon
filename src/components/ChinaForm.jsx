import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setChinaProduct, setReload } from "../redux/slices/adminReducer";
import { addToDraft } from "../utils/utils";

export default function ChinaForm({ id }) {
  const chinaProduct = useSelector((state) => state.admin.chinaProduct);
  const reload = useSelector((state) => state.admin.reload);
  const initialValues = {
    trackid: "",
  };

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);

        dispatch(setChinaProduct(null));
        dispatch(setReload(!reload));
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    trackid: Yup.string().required("Необходимо указать номер отправления"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      if (window.confirm("Вы уверены?")) {
        return axios.patch(`http://45.84.227.72:5000/checklist/${id}`, {
          status: "china",
          trackid: formPayload.trackid,
        });
      }
    },
  });
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, setValues, setFieldValue } = formik;
        return (
          <Form>
            <div className="form-group">
              <label className="label" htmlFor="trackid">
                Номер отправления POIZON
              </label>
              <Field
                name="trackid"
                type="text"
                className="form-control"
                id="trackid"
              />

              <ErrorMessage
                style={{ color: "red" }}
                name="trackid"
                component="span"
                className="form-control"
              />
            </div>
            <button className="button button-new no-icon" type="submit">
              На складе в Китае
            </button>
            <div
              className="button button-new no-icon draft-btn"
              onClick={() => addToDraft(chinaProduct)}
            >
              Отменить заказ
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
