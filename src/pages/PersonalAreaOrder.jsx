import React from "react";

export default function PersonalAreaOrder() {
  return (
    <>
      <header class="header-wrapper">
        <div class="container">
          <div class="header">
            <div class="logo">POIZON</div>
            <div class="buttons-wrapper">
              <a href="personal_area_order.html" class="track button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 22.75H3C2.04 22.75 1.25 21.96 1.25 21V8C1.25 3.58 3.58 1.25 8 1.25H16C20.42 1.25 22.75 3.58 22.75 8V16C22.75 20.42 20.42 22.75 16 22.75ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V21C2.75 21.14 2.86 21.25 3 21.25H16C19.58 21.25 21.25 19.58 21.25 16V8C21.25 4.42 19.58 2.75 16 2.75H8Z"
                    fill="#292D32"
                  />
                  <path
                    d="M15.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z"
                    fill="#292D32"
                  />
                  <path
                    d="M12 16.25C11.59 16.25 11.25 15.91 11.25 15.5V8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5V15.5C12.75 15.91 12.41 16.25 12 16.25Z"
                    fill="#292D32"
                  />
                </svg>
                Новый заказ
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="line"></div>
      <div class="push60 hidden-xss"></div>
      <div class="push20 visible-xss"></div>
      <section class="main-section">
        <div class="container">
          <div class="main-inner">
            <div class="title">Заказ #1561</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="text">Статус Расчет</div>
            <div class="push40 hidden-xss"></div>
            <div class="push20 visible-xss"></div>
            <ul class="tabs">
              <li class="current">
                <a href="personal_area_order.html">Заказ</a>
              </li>
              <li>
                <a href="personal_area_pay.html">Оплата</a>
              </li>
              <li>
                <a href="#">Клиент</a>
              </li>
              <li>
                <a href="#">Доставка</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="line"></div>
        <div class="container">
          <div class="main-inner">
            <section class="special-goods-wrapper">
              <div class="section">
                <div class="push60 hidden-xss"></div>
                <div class="push20 visible-xss"></div>
                <div class="box visible">
                  <form>
                    <div class="form-group">
                      <label class="label" for="public_link">
                        Публичная ссылка
                      </label>
                      <input
                        name="public_link"
                        type="text"
                        class="form-control"
                        disabled
                        id="public_link"
                      />
                    </div>
                    <div class="title">Товар</div>
                    <div class="push20"></div>
                    <div class="form-group">
                      <label class="label" for="link">
                        Ссылка
                      </label>
                      <input
                        name="link"
                        type="text"
                        class="form-control"
                        id="link"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="category">
                        Категория
                      </label>
                      <select
                        name="category"
                        class="form-control select-styler"
                        id="category"
                      >
                        <option value="Категория 1">Категория 1</option>
                        <option value="Категория 2">Категория 2</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="label" for="subcategory">
                        Подгатегория
                      </label>
                      <select
                        name="subcategory"
                        class="form-control select-styler"
                        id="subcategory"
                      >
                        <option value="Подгатегория 1">Подкатегория 1</option>
                        <option value="Подгатегория 2">Подкатегория 2</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="label" for="brand">
                        Брэнд
                      </label>
                      <input
                        name="brand"
                        type="text"
                        class="form-control"
                        id="brand"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="model">
                        Модель
                      </label>
                      <input
                        name="model"
                        type="text"
                        class="form-control"
                        id="model"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="size">
                        Размер
                      </label>
                      <input
                        name="size"
                        type="text"
                        class="form-control"
                        id="size"
                      />
                    </div>
                    <div class="images-slider-wrapper">
                      <div class="push20 hidden-xss"></div>
                      <div class="text-label">Изображение товара</div>
                      <div class="push20 hidden-xss"></div>
                      <div class="images-slider"></div>
                      <div class="push20 hidden-xss"></div>
                      <div class="form-group">
                        <div class="file-input fileInput addPhoto">
                          <input
                            type="file"
                            id="fileInput"
                            multiple="multiple"
                            accept="image/jpeg,image/png,image/gif"
                            name="fileInput[]"
                          />
                          <label for="fileInput" class="button">
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
                  </form>
                  <div class="push50 hidden-xss"></div>
                  <div class="push20 visible-xss"></div>
                  <div class="line hidden-xss"></div>
                  <div class="push60 hidden-xss"></div>
                  <form>
                    <div class="title">Расчет</div>
                    <div class="push20 hidden-xss"></div>
                    <div class="push15 visible-xss"></div>
                    <div class="form-group">
                      <label class="label" for="curs">
                        Курс RUB/CNY
                      </label>
                      <input
                        name="curs"
                        type="text"
                        class="form-control"
                        id="curs"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="CNY">
                        Цена CNY
                      </label>
                      <input
                        name="CNY"
                        type="text"
                        class="form-control"
                        id="CNY"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="RUB">
                        Цена RUB
                      </label>
                      <input
                        name="RUB"
                        type="text"
                        class="form-control"
                        id="RUB"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="deliveryPOIZON">
                        Стоимость доставки POIZON-Склад в Китае
                      </label>
                      <input
                        name="deliveryPOIZON"
                        type="text"
                        class="form-control"
                        id="deliveryPOIZON"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="deliveryChina">
                        Стоимость доставки Склад в Китае-РФ
                      </label>
                      <input
                        name="deliveryChina"
                        type="text"
                        class="form-control"
                        id="deliveryChina"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="commission">
                        Комиссия сервиса
                      </label>
                      <input
                        name="commission"
                        type="text"
                        class="form-control"
                        id="commission"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="promocode">
                        Промокод
                      </label>
                      <input
                        name="promocode"
                        type="text"
                        class="form-control"
                        id="promocode"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="totalcost">
                        Общая стоимость
                      </label>
                      <input
                        name="totalcost"
                        type="text"
                        class="form-control"
                        id="totalcost"
                      />
                    </div>
                    <div class="form-group">
                      <label class="label" for="comment">
                        Комментарий
                      </label>
                      <input
                        name="comment"
                        type="text"
                        class="form-control"
                        id="comment"
                      />
                    </div>
                    <div class="push5 visible-xss"></div>
                    <button class="button no-icon">Сохранить</button>
                  </form>
                  <div class="push80"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
