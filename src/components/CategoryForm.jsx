import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CategoryForm() {
  const [categories, setCategories] = useState([]);

  const [initialValues, setInitialValues] = useState({
    category: "",
    chinarush: 0,
  });

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/category`).then((data) => {
      setCategories(data.data);
    });
  }, [initialValues]);

  // console.log(chinarush);
  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    category: Yup.string().required("Необходимо указать категорию"),
    chinarush: Yup.number().required(
      "Необходимо указать условия доставки из Китая"
    ),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.post(`https://crm-poizonstore.ru/category/`, formPayload);
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
        const { values } = formik;

        let chinarushObj = categories?.categories?.find(
          (obj) => obj.category === values.category
        );

        if (chinarushObj) {
          setInitialValues(chinarushObj);
        }

        return (
          <Form className="main-inner">
            <div className="title">Категории</div>
            <div className="push40 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="form-group">
              <label className="label" htmlFor="category">
                Категория
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                as="select"
                name="category"
                type="number"
                className="form-control"
                id="category"
              >
                <option value="">Не указано</option>
                {categories?.categories?.map((categ) => (
                  <option key={categ.category} value={categ.category}>
                    {categ.category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                style={{ color: "red" }}
                name="category"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="chinarush">
                Стоимость доставки Склад в Китае-РФ
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                name="chinarush"
                type="number"
                className="form-control"
                id="chinarush"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="chinarush"
                component="span"
                className="form-control"
              />
            </div>
            <div className="push30 visible-xss"></div>
            <button className="button curs" type="submit">
              Сохранить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
