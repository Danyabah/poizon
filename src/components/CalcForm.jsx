import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function CalcForm({ setPublicLink }) {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({});

  const token = useSelector((state) => state.user.token);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/category`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setCategories(data.data);
      });
    axios
      .get(`https://crm-poizonstore.ru/settings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setPrice(res.data);

        setCurrency(res.data.currency);
      });
  }, []);

  const initialValues = {
    link: "",
    category: categories[0]?.id,
    subcategory: categories[0]?.children[0].id,
    size: "",
    currency: currency || 0,
    curencycurency2: "",
    currency3: 0,
    chinadelivery: price?.chinadelivery || 0,
    chinadelivery2: categories[0]?.chinarush, //в заивисимости от категории chinarush,
    commission: price?.commission || 0,
    fullprice: 0,
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        const url = `${window.location.origin}/personalareaorder/${response.data.id}`;
        setPublicLink(url);
        console.log(response.data);

        document.documentElement.scrollTo(0, 0);
        alert("Сохранено");
      },
      onError: (response) => {
        alert("Произошла ошибка");
      },
    });
  };

  const validSchema = Yup.object().shape({
    link: Yup.string().required("Необходимо указать ссылку"),

    // curencycurency2: Yup.number()
    //   .min(1, "Необходимо указать цену")
    //   .required("Необходимо указать цену"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      let data = Object.assign({}, formPayload);

      data.curencycurency2 = +data.curencycurency2;

      if (!data.size.trim()) {
        data.size = null;
      }
      data.category = data.subcategory;
      delete data.subcategory;
      data.status = "draft";

      return axios.post(`https://crm-poizonstore.ru/checklist/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
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
        const { values, setValues, setFieldValue, isValid, resetForm } = formik;
        console.log(values.subcategory);

        return (
          <Form>
            <div className="title">Рассчитать стоимость</div>
            <div className="push20"></div>
            <div className="form-group">
              <label className="label" htmlFor="link">
                Ссылка
              </label>
              <Field
                name="link"
                type="text"
                className="form-control"
                id="link"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="link"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="category">
                Категория
              </label>
              <Field
                as="select"
                name="category"
                className="form-control select-styler"
                id="category"
                onChange={(e) => {
                  setFieldValue("category", e.target.value);
                  setFieldValue(
                    "subcategory",
                    categories[e.target.value - 1].children[0].id
                  );

                  setFieldValue(
                    "chinadelivery2",
                    categories[+e.target.value - 1].chinarush
                  );

                  let fullprice =
                    values.currency3 +
                    values.chinadelivery +
                    categories[+e.target.value - 1].chinarush +
                    values.commission;

                  if (e.target.value == 7) {
                    setFieldValue(
                      "chinadelivery2",
                      categories[6].children[0].chinarush
                    );
                  }
                  setFieldValue("fullprice", fullprice);
                }}
              >
                {categories?.map((categ) => (
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
              <label className="label" htmlFor="subcategory">
                Подгатегория
              </label>
              <Field
                as="select"
                name="subcategory"
                className="form-control select-styler"
                id="subcategory"
                onChange={(e) => {
                  setFieldValue("subcategory", e.target.value);
                  if (values.category == 7) {
                    setFieldValue(
                      "chinadelivery2",
                      categories[6].children.find(
                        (el) => el.id == e.target.value
                      ).chinarush
                    );
                  }
                }}
              >
                {categories[+values.category - 1]?.children?.map((categ) => (
                  <option key={categ.id} value={categ.id}>
                    {categ.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                style={{ color: "red" }}
                name="subcategory"
                component="span"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="size">
                Размер
              </label>
              <Field
                name="size"
                type="text"
                className="form-control"
                id="size"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="size"
                component="span"
                className="form-control"
              />
            </div>

            <div className="push50 hidden-xss"></div>
            <ErrorMessage
              style={{ color: "red" }}
              name="image"
              component="span"
              className="form-control"
            />
            <div className="push20 visible-xss"></div>
            <div className="line hidden-xss"></div>
            <div className="push60 hidden-xss"></div>

            <div className="title">Расчет</div>
            <div className="push20 hidden-xss"></div>
            <div className="push15 visible-xss"></div>
            <div className="form-group">
              <label className="label" htmlFor="currency">
                Курс RUB/CNY
              </label>
              <Field
                disabled
                name="currency"
                type="text"
                className="form-control"
                id="curs"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="curencycurency2">
                Цена CNY
              </label>
              <Field
                name="curencycurency2"
                type="number"
                className="form-control"
                id="curencycurency2"
                onChange={(e) => {
                  setFieldValue("curencycurency2", e.target.value);
                  let cur3 = Math.round(+e.target.value * values.currency, 2);
                  let com = values.commission;
                  if (values.category == 7) {
                    let comPersent = categories[6].commission;
                    console.log(Math.round(cur3 * (comPersent / 100)));

                    setFieldValue(
                      "commission",
                      Math.round(cur3 * (comPersent / 100))
                    );
                    com = Math.round(cur3 * (comPersent / 100));
                  }

                  setFieldValue("currency3", cur3);
                  let fullprice =
                    cur3 + values.chinadelivery + values.chinadelivery2 + com;

                  console.log(com);

                  setFieldValue("fullprice", fullprice);
                }}
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="curencycurency2"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="currency3">
                Цена RUB
              </label>
              <Field
                disabled
                name="currency3"
                type="text"
                className="form-control"
                id="currency3"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="chinadelivery">
                Стоимость доставки POIZON-Склад в Китае
              </label>
              <Field
                disabled
                name="chinadelivery"
                type="text"
                className="form-control"
                id="chinadelivery"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="chinadelivery2">
                Стоимость доставки Склад в Китае-РФ
              </label>
              <Field
                disabled
                name="chinadelivery2"
                type="text"
                className="form-control"
                id="chinadelivery2"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="commission">
                Комиссия сервиса
              </label>
              <Field
                disabled
                name="commission"
                type="text"
                className="form-control"
                id="commission"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="fullprice">
                Общая стоимость
              </label>
              <Field
                disabled
                name="fullprice"
                type="text"
                className="form-control"
                id="fullprice"
              />
            </div>

            <div className="push5 visible-xss"></div>
            <button className="button no-icon green-btn" type="submit">
              Создать заказ
            </button>
            <div
              className="button no-icon draft-btn black-btn"
              onClick={() => {
                if (window.confirm("Вы уверены что хотите очистить форму?")) {
                  resetForm();
                }
              }}
            >
              Очистить
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
