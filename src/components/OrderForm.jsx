import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/userReducer";
import {
  addToDraft,
  allUppers,
  subcategory,
  toDataUrl,
  translate,
} from "../utils/utils";
import PreviewImage from "./PreviewImage";
import { useLocation, useParams } from "react-router-dom";
import { setPreviewimage, setPublicLink } from "../redux/slices/adminReducer";
import EditProduct from "./EditProduct";

export default function OrderForm() {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({});
  const [lastPrice, setLastPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastDelivery, setLastDelivery] = useState(categories[0]?.chinarush);

  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const imagesUrl = useSelector((state) => state.admin.images);
  const [currency, setCurrency] = useState("");
  const [promo, setPromo] = useState([]);
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState([]);
  const [selectPrice, setSelectPrice] = useState(null);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://crm-poizonstore.ru/checklist/${id}`).then((res) => {
      console.log(res);
      if (typeof res.data["error"] == "undefined") {
        setProduct(res.data);
        console.log(categories);
      }
    });
  }, [id]);

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
        setLastDelivery(data.data[0].chinarush);
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
    axios
      .get(`https://crm-poizonstore.ru/promo/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setPromo(res.data.promo);
      });
  }, []);

  function getCategoryId(id) {
    for (let i = 0; i < categories.length; i++) {
      const el = categories[i];
      for (let j = 0; j < el.children.length; j++) {
        const child = el.children[j];
        if (child.id == id) {
          return el.id;
        }
      }
    }
  }

  const initialValues = {
    managerid: userInfo.id || "",
    link: product?.link || "",
    category: getCategoryId(product?.category?.id) || categories[0]?.id,
    subcategory: product?.category?.id || categories[0]?.children[0].id,
    brand: product?.brand || "",
    model: product?.model || "",
    size: product?.size || "",
    image: product?.image || [],
    currency: currency || 0,
    curencycurency2: "",
    currency3: 0,
    chinadelivery: price?.chinadelivery || 0,
    chinadelivery2: categories[0]?.chinarush, //в заивисимости от категории chinarush,
    commission: price?.commission || 0,
    promo: "",
    fullprice: 0,

    comment: "",
  };

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        const url = `${window.location.origin}/orderpage/${response.data.id}`;
        dispatch(setPublicLink(url));
        console.log(response.data);
        dispatch(setPreviewimage(response.data.previewimage));
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
    brand: Yup.string().required("Необходимо указать бренд"),
    model: Yup.string().required("Необходимо указать модель"),

    curencycurency2: Yup.number()
      .min(1, "Необходимо указать цену")
      .required("Необходимо указать цену"),
    image: Yup.array()
      .min(1, "Добавьте изображения")
      .required("Добавьте изображения"),
  });

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      if (window.confirm("Вы уверены?")) {
        let data = Object.assign({}, formPayload);

        data.curencycurency2 = +data.curencycurency2;
        console.log(imagesUrl);
        data.image = imagesUrl; //потом почистить массив изображений
        data.status = "neworder";
        // data.brand = allUppers(data.brand);

        if (!data.size.trim()) {
          data.size = null;
        }

        // категории
        data.category = data.subcategory;
        delete data.subcategory;

        // data.model = allUppers(data.model);
        if (data?.promo.trim() === "") {
          delete data.promo;
        } else {
          data.promo = JSON.parse(data.promo).name;
        }
        if (data.comment && data.comment.trim() === "") {
          delete data.comment;
        }

        if (!product) {
          return axios.post(`https://crm-poizonstore.ru/checklist/`, data, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        } else {
          // delete data.image;
          if (data.image[0] === product.image[0]) {
            delete data.image;
          }

          return axios.patch(
            `https://crm-poizonstore.ru/checklist/${product.id}`,
            {
              ...data,
              paymentprovement: null,
              paymenttype: null,
              delivery: null,
              delivery_display: null,
              buyername: null,
              buyerphone: null,
              status: "neworder",
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

  const fileRef = useRef(null);

  function handleGet(link, func) {
    link = link.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )[0];

    setLoading(true);
    axios
      .post(
        "https://crm-poizonstore.ru/poizon/good/",
        {
          url: link.trim(),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        let info = res.data["0"].data;
        let url = info.logoUrl;
        setSelectPrice(null);
        setSizes(info.responseList);
        func("image", []);

        toDataUrl(url, function (myBase64) {
          func("image", [myBase64]);
        });

        func("link", link);
        func("brand", info.brandName);
        func("model", info.title.replace(/\p{sc=Han}|[,.+]/gu, "").trim());
      })
      .catch((err) => {
        alert("Проверьте ссылку");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const selectPriceVal = (pr, setFieldValue, values) => {
    let val = pr / 100;
    setFieldValue("curencycurency2", val);

    let cur3 = Math.round(+val * values.currency, 2);
    let com = values.commission;
    if (values.category == 7) {
      let comPersent = categories[6].commission;
      console.log(Math.round(cur3 * (comPersent / 100)));

      setFieldValue("commission", Math.round(cur3 * (comPersent / 100)));
      com = Math.round(cur3 * (comPersent / 100));
    }

    setFieldValue("currency3", cur3);
    let fullprice = cur3 + values.chinadelivery + values.chinadelivery2 + com;

    console.log(com);
    setLastPrice(fullprice);
    setFieldValue("fullprice", fullprice);
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, setValues, setFieldValue, isValid } = formik;
        console.log(values);
        return (
          <Form>
            <EditProduct
              product={product}
              categories={categories}
              setLastPrice={setLastPrice}
              setPrice={(price) => {
                setFieldValue("curencycurency2", price);
              }}
            />

            <div className="title">Товар</div>
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
              <button
                disabled={values.link === "" || loading}
                className="button no-icon"
                type="button"
                onClick={() => handleGet(values.link, setFieldValue)}
              >
                {loading ? "Загрузка..." : "Выгрузить"}
              </button>
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
                  setLastDelivery(categories[+e.target.value - 1].chinarush);
                  setFieldValue(
                    "chinadelivery2",
                    categories[+e.target.value - 1].chinarush
                  );

                  let cur3 = Math.round(+values.curencycurency2 * values.currency, 2);
                  let com = values.commission;
                  if ( e.target.value == 7) {
                    let comPersent = categories[6].commission;
                    console.log(Math.round(cur3 * (comPersent / 100)));

                    setFieldValue(
                      "commission",
                      Math.round(cur3 * (comPersent / 100))
                    );
                    com = Math.round(cur3 * (comPersent / 100));
                  }

                
                  

              

                  let fullprice =
                    values.currency3 +
                    values.chinadelivery +
                    categories[+e.target.value - 1].chinarush +
                    com;
                  setLastPrice(fullprice);
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
              <label className="label" htmlFor="brand">
                Бренд
              </label>
              <Field
                name="brand"
                type="text"
                className="form-control"
                id="brand"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="brand"
                component="span"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="model">
                Модель
              </label>
              <Field
                name="model"
                type="text"
                className="form-control"
                id="model"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="model"
                component="span"
                className="form-control"
              />
            </div>
            {sizes.length ? (
              <div className="form-group">
                <div className="sizes__container">
                  {sizes.map((el) => {
                    if (el.lightningValues || el.ordinaryValues) {
                      return (
                        <div
                          className={`size-item ${
                            values.size === el.value ? "size-active" : ""
                          }`}
                          onClick={() => {
                            setFieldValue("size", el.value);
                            setSelectPrice(el);
                          }}
                        >
                          <span className="size__value">{el.value}</span>
                          <span className="size__price">
                            {/* {el.ordinaryValues / 100} ¥ */}
                            {(el.lightningValues || el.ordinaryValues) / 100} ¥
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
                {selectPrice && (
                  <>
                    <div className="push20 visible-xss"></div>
                    <div className="push20 hidden-xss"></div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      {selectPrice?.lightningValues ? (
                        <span
                          className="button"
                          onClick={() =>
                            selectPriceVal(
                              selectPrice?.lightningValues,
                              setFieldValue,
                              values
                            )
                          }
                        >
                          {selectPrice?.lightningValues / 100} ¥
                        </span>
                      ) : (
                        <></>
                      )}
                      {selectPrice?.ordinaryValues ? (
                        <span
                          onClick={(e) =>
                            selectPriceVal(
                              selectPrice?.ordinaryValues,
                              setFieldValue,
                              values
                            )
                          }
                          className="button"
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "black",
                          }}
                        >
                          {selectPrice?.ordinaryValues / 100} ¥
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
                <div className="push20 visible-xss"></div>
                <div className="push20 hidden-xss"></div>
              </div>
            ) : (
              <></>
            )}
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
            <div className="images-slider-wrapper">
              <div className="push20 hidden-xss"></div>
              <div className="text-label">Изображение товара</div>
              <div className="push20 hidden-xss"></div>
              <div className="image__list">
                {values.image.length !== 0 && (
                  <PreviewImage
                    name="image"
                    setField={setFieldValue}
                    file={values.image}
                  />
                )}
              </div>

              <div className="images-slider"></div>
              <div className="push20 hidden-xss"></div>
              <div className="form-group">
                <div className="file-input fileInput addPhoto">
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    id="image"
                    multiple="multiple"
                    accept="image/jpeg,image/png,image/gif"
                    name="image"
                    onChange={(e) => {
                      console.log(Array.from(e.target.files));
                      setFieldValue("image", Array.from(e.target.files));
                    }}
                  />
                  <label
                    htmlFor="fileInput"
                    className="button"
                    onClick={() => fileRef.current.click()}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H13C13.41 1.25 13.75 1.59 13.75 2C13.75 2.41 13.41 2.75 13 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18 8.75C17.9 8.75 17.81 8.73 17.71 8.69C17.43 8.58 17.25 8.3 17.25 8V2C17.25 1.59 17.59 1.25 18 1.25C18.41 1.25 18.75 1.59 18.75 2V6.19L19.47 5.47C19.76 5.18 20.24 5.18 20.53 5.47C20.82 5.76 20.82 6.24 20.53 6.53L18.53 8.53C18.39 8.67 18.2 8.75 18 8.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M17.9999 8.74994C17.8099 8.74994 17.6199 8.67994 17.4699 8.52994L15.4699 6.52994C15.1799 6.23994 15.1799 5.75994 15.4699 5.46994C15.7599 5.17994 16.2399 5.17994 16.5299 5.46994L18.5299 7.46994C18.8199 7.75994 18.8199 8.23994 18.5299 8.52994C18.3799 8.67994 18.1899 8.74994 17.9999 8.74994Z"
                        fill="#292D32"
                      />
                      <path
                        d="M2.66977 19.7001C2.42977 19.7001 2.18977 19.5801 2.04977 19.3701C1.81977 19.0301 1.90977 18.5601 2.25977 18.3301L7.18977 15.0201C8.26977 14.2901 9.75977 14.3801 10.7398 15.2101L11.0698 15.5001C11.5698 15.9301 12.4198 15.9301 12.9098 15.5001L17.0698 11.9301C18.1298 11.0201 19.7998 11.0201 20.8698 11.9301L22.4998 13.3301C22.8098 13.6001 22.8498 14.0701 22.5798 14.3901C22.3098 14.7001 21.8398 14.7401 21.5198 14.4701L19.8898 13.0701C19.3898 12.6401 18.5398 12.6401 18.0398 13.0701L13.8798 16.6401C12.8198 17.5501 11.1498 17.5501 10.0798 16.6401L9.74977 16.3501C9.28977 15.9601 8.52977 15.9201 8.01977 16.2701L3.08977 19.5801C2.95977 19.6601 2.80977 19.7001 2.66977 19.7001Z"
                        fill="#292D32"
                      />
                    </svg>
                    Добавить фото
                  </label>
                </div>
              </div>
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
                  setLastPrice(fullprice);
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
              <label className="label" htmlFor="promo">
                Промокод
              </label>
              <Field
                as="select"
                name="promo"
                type="text"
                className="form-control"
                id="promo"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setFieldValue("fullprice", lastPrice);
                    setFieldValue("commission", price.commission);
                    setFieldValue("chinadelivery2", lastDelivery);

                    let obj = JSON.parse(e.target.value);

                    if (obj.discount && obj.nocomission) {
                      let r = lastPrice - values.commission;

                      let price = r - obj.discount;
                      setFieldValue("fullprice", Math.round(price, 2));
                    } else if (obj.discount && obj.freedelivery) {
                      let r = lastPrice - values.chinadelivery2;

                      let price = r - obj.discount;
                      setFieldValue("fullprice", Math.round(price, 2));
                    } else if (obj.discount) {
                      let price = lastPrice - obj.discount;
                      setFieldValue("fullprice", Math.round(price, 2));
                    } else if (obj.nocomission) {
                      setFieldValue(
                        "fullprice",
                        Math.round(lastPrice - values.commission, 2)
                      );
                    } else if (obj.freedelivery) {
                      setFieldValue(
                        "fullprice",
                        Math.round(lastPrice - values.chinadelivery2, 2)
                      );
                    }
                    if (obj.nocomission) {
                      setFieldValue("commission", 0);
                    }
                    if (obj.freedelivery) {
                      setFieldValue("chinadelivery2", 0);
                    }
                  } else {
                    setFieldValue("fullprice", lastPrice);
                    setFieldValue("commission", price.commission);
                    setFieldValue("chinadelivery2", lastDelivery);
                  }

                  setFieldValue("promo", e.target.value);
                }}
              >
                <option value="">Не указано</option>
                {promo?.map(
                  (prom) =>
                    prom.is_active && (
                      <option key={prom.name} value={JSON.stringify(prom)}>
                        {prom.name}
                      </option>
                    )
                )}
              </Field>
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
            <div className="form-group">
              <label className="label" htmlFor="comment">
                Комментарий
              </label>
              <Field
                name="comment"
                type="text"
                className="form-control"
                id="comment"
              />
            </div>
            <div className="push5 visible-xss"></div>
            <button className="button no-icon" type="submit">
              Сохранить
            </button>
            <div
              className="button no-icon draft-btn"
              onClick={() => {
                if (
                  window.confirm("Вы уверены что хотите добавить в черновик?")
                ) {
                  // copy.status = "draft";
                  axios
                    .post(
                      `https://crm-poizonstore.ru/checklist/`,
                      { ...values, status: "draft" },
                      {
                        headers: {
                          Authorization: `Token ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      if (res.status === 201) {
                        alert("Добавлено в черновик");
                      }
                      console.log(res);
                    });
                }
              }}
            >
              В Черновик
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
