import React from "react";
import Header from "../components/Header";

export default function OrderPageInProgress() {
  return (
    <>
      <Header />
      <div class="line"></div>
      <div class="push60 hidden-xss"></div>
      <div class="push20 visible-xss"></div>
      <section class="main-section">
        <div class="container">
          <div class="main-inner">
            <div class="text">Статус: Выкуплен</div>
            <div class="push40 hidden-xss"></div>
            <div class="push20 visible-xss"></div>
            <div class="title">Название товара</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="text">Одежда, куртки, размер М</div>
            <div class="push10 hidden-xss"></div>
            <div class="push5 visible-xss"></div>
            <div class="text">Ссылка</div>
            <div class="push20 hidden-xss"></div>
            <div class="push10 visible-xss"></div>
            <div class="price">19 214 ₽</div>
            <div class="push30 hidden-xss"></div>
            <div class="push15 visible-xss"></div>
            <div class="more-wrapper">Подробности расчета</div>
            <div class="push30 hidden-xss"></div>
            <div class="push15 visible-xss"></div>
            <div class="text">Способ доставки: СДЭК самовывоз</div>
            <div class="push20 hidden-xss"></div>
            <div class="push5 visible-xss"></div>
            <div class="text">
              Адрес: Тверь Проспект Победы, 73 На Проспекте Победы
            </div>
            <div class="push35 hidden-xss"></div>
            <div class="push15 visible-xss"></div>
            <div class="change">Изменить данные доставки</div>
            <div class="push40 hidden-xss"></div>
            <div class="push25 visible-xss"></div>
            <section>
              <div class="history-wrap">
                <div class="title">История заказа</div>
                <div class="push60 hidden-xss"></div>
                <div class="push10 visible-xss"></div>
                <div class="text">
                  В этом разделе мы показываем, где сейчас ваш заказ. Обычно до
                  России заказы доходят за три недели.
                </div>
                <div class="push50 hidden-xss"></div>
                <div class="push30 visible-xss"></div>
                <ul>
                  <li class="text ready">
                    Проверка оплаты
                    <ul>
                      <li>
                        <a href="#">Чек об оплате</a>
                      </li>
                    </ul>
                  </li>
                  <li class="text ready">Оплачен</li>
                  <li class="text ready">На закупке</li>
                  <li class="text ready">
                    Закуплен
                    <ul>
                      <li>Цена закупки: 1291,00 CNY</li>
                      <li>
                        <a href="#">Чек закупки №1</a>
                      </li>
                      <li>
                        <a href="#">Чек закупки №2</a>
                      </li>
                    </ul>
                  </li>
                  <li class="text">На складе в Китае</li>
                  <li class="text">Доставка на склад РФ</li>
                  <li class="text">На складе в РФ</li>
                  <li class="text">Доставляется</li>
                  <li class="text">Завершен</li>
                </ul>
              </div>
            </section>
            <div class="push100"></div>
            <div class="push100"></div>
          </div>
        </div>
      </section>
    </>
  );
}
