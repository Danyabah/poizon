import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export default function SubCategForm() {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [selectedCateg, setSelectedCateg] = useState(1);

  const initialValues = {
    category: 0,
    chinarush: 0,
  };

  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/category`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        setCategories(data.data);
      });
  }, []);

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
      return axios.patch(
        `https://crm-poizonstore.ru/category/${formPayload.category}`,
        formPayload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
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
        const { values, setFieldValue } = formik;

        return (
          <Form className="main-inner">
            <div className="title">Подкатегории</div>
            <div className="push40 hidden-xss"></div>
            <div className="push10 visible-xss"></div>
            <div className="form-group">
              <label className="label" htmlFor="category">
                Категория
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                as="select"
                className="form-control"
                onChange={(e) => {
                  setSelectedCateg(e.target.value);
                  setFieldValue("chinarush", 0);
                  setFieldValue("category", 0);
                }}
                value={selectedCateg}
              >
                <option value={0}>Не указано</option>
                {categories.map((categ, i) => (
                  <option key={categ.id} value={i + 1}>
                    {categ.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="category">
                Подкатегории
              </label>
              <div className="push10 visible-xss"></div>
              <Field
                as="select"
                name="category"
                type="number"
                className="form-control"
                id="category"
                onChange={(e) => {
                  let price = categories[selectedCateg - 1]?.children.find(
                    (obj) => obj.id == e.target.value
                  );

                  setFieldValue("chinarush", price?.chinarush);
                  setFieldValue("category", e.target.value);
                }}
              >
                <option value={0}>Не указано</option>
                {categories[selectedCateg - 1]?.children?.map((categ) => (
                  <option key={categ.id} value={categ.id}>
                    {categ.name}
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
