import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function StatisticCategories() {
  const [statistic, setStatistic] = useState({});
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/categories`).then((data) => {
      setStatistic(data.data);
    });
  }, []);
  console.log(statistic);
  return (
    <>
      <Header />
      <div className="line"></div>
      <section className="main-section">
        <div className="container">
          <div className="push45 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
          <div className="main-inner">
            <div className="title">Статистика с категориями</div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container categ">
          <div className="check-table depot categories statistic table">
            <div className="table-row">
              <div className="table-td">{new Date().getFullYear()}</div>
              <div className="table-td">Обувь</div>
              <div className="table-td">Верхняя Одежда</div>
              <div className="table-td">Аксессуары</div>
              <div className="table-td">Электроника</div>
              <div className="table-td">Сумки</div>
              <div className="table-td">Косметика</div>
              <div className="table-td">Еда и Напитки</div>
              <div className="table-td">Товары для дома</div>
              <div className="table-td">Игрушки</div>
              <div className="table-td">Нижняя Одежда</div>
              <div className="table-td">Часы</div>
              <div className="table-td">Другое</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
              <div className="table-td">{statistic["January"]?.shoes}</div>
              <div className="table-td">{statistic["January"]?.outerwear}</div>
              <div className="table-td">
                {statistic["January"]?.accessories}
              </div>
              <div className="table-td">{statistic["January"]?.technics}</div>
              <div className="table-td">{statistic["January"]?.bags}</div>
              <div className="table-td">{statistic["January"]?.cosmetics}</div>
              <div className="table-td">
                {statistic["January"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["January"]?.home}</div>
              <div className="table-td">{statistic["January"]?.toys}</div>
              <div className="table-td">{statistic["January"]?.underwear}</div>
              <div className="table-td">{statistic["January"]?.watches}</div>
              <div className="table-td">{statistic["January"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Февраль</div>
              <div className="table-td">{statistic["February"]?.shoes}</div>
              <div className="table-td">{statistic["February"]?.outerwear}</div>
              <div className="table-td">
                {statistic["February"]?.accessories}
              </div>
              <div className="table-td">{statistic["February"]?.technics}</div>
              <div className="table-td">{statistic["February"]?.bags}</div>
              <div className="table-td">{statistic["February"]?.cosmetics}</div>
              <div className="table-td">
                {statistic["February"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["February"]?.home}</div>
              <div className="table-td">{statistic["February"]?.toys}</div>
              <div className="table-td">{statistic["February"]?.underwear}</div>
              <div className="table-td">{statistic["February"]?.watches}</div>
              <div className="table-td">{statistic["February"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Март</div>
              <div className="table-td">{statistic["March"]?.shoes}</div>
              <div className="table-td">{statistic["March"]?.outerwear}</div>
              <div className="table-td">{statistic["March"]?.accessories}</div>
              <div className="table-td">{statistic["March"]?.technics}</div>
              <div className="table-td">{statistic["March"]?.bags}</div>
              <div className="table-td">{statistic["March"]?.cosmetics}</div>
              <div className="table-td">{statistic["March"]?.foodndrinks}</div>
              <div className="table-td">{statistic["March"]?.home}</div>
              <div className="table-td">{statistic["March"]?.toys}</div>
              <div className="table-td">{statistic["March"]?.underwear}</div>
              <div className="table-td">{statistic["March"]?.watches}</div>
              <div className="table-td">{statistic["March"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Апрель</div>
              <div className="table-td">{statistic["April"]?.shoes}</div>
              <div className="table-td">{statistic["April"]?.outerwear}</div>
              <div className="table-td">{statistic["April"]?.accessories}</div>
              <div className="table-td">{statistic["April"]?.technics}</div>
              <div className="table-td">{statistic["April"]?.bags}</div>
              <div className="table-td">{statistic["April"]?.cosmetics}</div>
              <div className="table-td">{statistic["April"]?.foodndrinks}</div>
              <div className="table-td">{statistic["April"]?.home}</div>
              <div className="table-td">{statistic["April"]?.toys}</div>
              <div className="table-td">{statistic["April"]?.underwear}</div>
              <div className="table-td">{statistic["April"]?.watches}</div>
              <div className="table-td">{statistic["April"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Май</div>
              <div className="table-td">{statistic["May"]?.shoes}</div>
              <div className="table-td">{statistic["May"]?.outerwear}</div>
              <div className="table-td">{statistic["May"]?.accessories}</div>
              <div className="table-td">{statistic["May"]?.technics}</div>
              <div className="table-td">{statistic["May"]?.bags}</div>
              <div className="table-td">{statistic["May"]?.cosmetics}</div>
              <div className="table-td">{statistic["May"]?.foodndrinks}</div>
              <div className="table-td">{statistic["May"]?.home}</div>
              <div className="table-td">{statistic["May"]?.toys}</div>
              <div className="table-td">{statistic["May"]?.underwear}</div>
              <div className="table-td">{statistic["May"]?.watches}</div>
              <div className="table-td">{statistic["May"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Июнь</div>
              <div className="table-td">{statistic["June"]?.shoes}</div>
              <div className="table-td">{statistic["June"]?.outerwear}</div>
              <div className="table-td">{statistic["June"]?.accessories}</div>
              <div className="table-td">{statistic["June"]?.technics}</div>
              <div className="table-td">{statistic["June"]?.bags}</div>
              <div className="table-td">{statistic["June"]?.cosmetics}</div>
              <div className="table-td">{statistic["June"]?.foodndrinks}</div>
              <div className="table-td">{statistic["June"]?.home}</div>
              <div className="table-td">{statistic["June"]?.toys}</div>
              <div className="table-td">{statistic["June"]?.underwear}</div>
              <div className="table-td">{statistic["June"]?.watches}</div>
              <div className="table-td">{statistic["June"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Июль</div>
              <div className="table-td">{statistic["July"]?.shoes}</div>
              <div className="table-td">{statistic["July"]?.outerwear}</div>
              <div className="table-td">{statistic["July"]?.accessories}</div>
              <div className="table-td">{statistic["July"]?.technics}</div>
              <div className="table-td">{statistic["July"]?.bags}</div>
              <div className="table-td">{statistic["July"]?.cosmetics}</div>
              <div className="table-td">{statistic["July"]?.foodndrinks}</div>
              <div className="table-td">{statistic["July"]?.home}</div>
              <div className="table-td">{statistic["July"]?.toys}</div>
              <div className="table-td">{statistic["July"]?.underwear}</div>
              <div className="table-td">{statistic["July"]?.watches}</div>
              <div className="table-td">{statistic["July"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Август</div>
              <div className="table-td">{statistic["August"]?.shoes}</div>
              <div className="table-td">{statistic["August"]?.outerwear}</div>
              <div className="table-td">{statistic["August"]?.accessories}</div>
              <div className="table-td">{statistic["August"]?.technics}</div>
              <div className="table-td">{statistic["August"]?.bags}</div>
              <div className="table-td">{statistic["August"]?.cosmetics}</div>
              <div className="table-td">{statistic["August"]?.foodndrinks}</div>
              <div className="table-td">{statistic["August"]?.home}</div>
              <div className="table-td">{statistic["August"]?.toys}</div>
              <div className="table-td">{statistic["August"]?.underwear}</div>
              <div className="table-td">{statistic["August"]?.watches}</div>
              <div className="table-td">{statistic["August"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Сентябрь</div>
              <div className="table-td">{statistic["September"]?.shoes}</div>
              <div className="table-td">
                {statistic["September"]?.outerwear}
              </div>
              <div className="table-td">
                {statistic["September"]?.accessories}
              </div>
              <div className="table-td">{statistic["September"]?.technics}</div>
              <div className="table-td">{statistic["September"]?.bags}</div>
              <div className="table-td">
                {statistic["September"]?.cosmetics}
              </div>
              <div className="table-td">
                {statistic["September"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["September"]?.home}</div>
              <div className="table-td">{statistic["September"]?.toys}</div>
              <div className="table-td">
                {statistic["September"]?.underwear}
              </div>
              <div className="table-td">{statistic["September"]?.watches}</div>
              <div className="table-td">
                {statistic["September"]?.different}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Октябрь</div>
              <div className="table-td">{statistic["October"]?.shoes}</div>
              <div className="table-td">{statistic["October"]?.outerwear}</div>
              <div className="table-td">
                {statistic["October"]?.accessories}
              </div>
              <div className="table-td">{statistic["October"]?.technics}</div>
              <div className="table-td">{statistic["October"]?.bags}</div>
              <div className="table-td">{statistic["October"]?.cosmetics}</div>
              <div className="table-td">
                {statistic["October"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["October"]?.home}</div>
              <div className="table-td">{statistic["October"]?.toys}</div>
              <div className="table-td">{statistic["October"]?.underwear}</div>
              <div className="table-td">{statistic["October"]?.watches}</div>
              <div className="table-td">{statistic["October"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Ноябрь</div>
              <div className="table-td">{statistic["November"]?.shoes}</div>
              <div className="table-td">{statistic["November"]?.outerwear}</div>
              <div className="table-td">
                {statistic["November"]?.accessories}
              </div>
              <div className="table-td">{statistic["November"]?.technics}</div>
              <div className="table-td">{statistic["November"]?.bags}</div>
              <div className="table-td">{statistic["November"]?.cosmetics}</div>
              <div className="table-td">
                {statistic["November"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["November"]?.home}</div>
              <div className="table-td">{statistic["November"]?.toys}</div>
              <div className="table-td">{statistic["November"]?.underwear}</div>
              <div className="table-td">{statistic["November"]?.watches}</div>
              <div className="table-td">{statistic["November"]?.different}</div>
            </div>
            <div className="table-row">
              <div className="table-td">Деабрь</div>
              <div className="table-td">{statistic["December"]?.shoes}</div>
              <div className="table-td">{statistic["December"]?.outerwear}</div>
              <div className="table-td">
                {statistic["December"]?.accessories}
              </div>
              <div className="table-td">{statistic["December"]?.technics}</div>
              <div className="table-td">{statistic["December"]?.bags}</div>
              <div className="table-td">{statistic["December"]?.cosmetics}</div>
              <div className="table-td">
                {statistic["December"]?.foodndrinks}
              </div>
              <div className="table-td">{statistic["December"]?.home}</div>
              <div className="table-td">{statistic["December"]?.toys}</div>
              <div className="table-td">{statistic["December"]?.underwear}</div>
              <div className="table-td">{statistic["December"]?.watches}</div>
              <div className="table-td">{statistic["December"]?.different}</div>
            </div>
          </div>
        </div>
        <div className="push100"></div>
        <div className="push100"></div>
        <div className="push100"></div>
      </section>
    </>
  );
}
