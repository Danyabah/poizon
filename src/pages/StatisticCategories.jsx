import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { monthArray, monthRU, translate } from "../utils/utils";

export default function StatisticCategories() {
  const [statistic, setStatistic] = useState({});

  const [months, setMonths] = useState(monthArray);

  const [categs, setCategs] = useState(Object.values(translate));

  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru/statistics/categories/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
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
          <div className="filter__list">
            <fieldset>
              <legend>Месяца:</legend>
              {monthArray.map((el) => (
                <div className="filter__item">
                  <input
                    type="checkbox"
                    id={el}
                    name={el}
                    checked={months.includes(el)}
                    onClick={(e) => {
                      if (!e.target.checked) {
                        setMonths((prev) => prev.filter((mt) => mt !== el));
                      } else {
                        setMonths((prev) => [...prev, el]);
                      }
                    }}
                  />
                  <label for={el}>{monthRU[el]}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Категории:</legend>
              {Object.values(translate).map((el) => (
                <div className="filter__item">
                  <input
                    type="checkbox"
                    id={el}
                    name={el}
                    checked={categs.includes(el)}
                    onClick={(e) => {
                      if (!e.target.checked) {
                        setCategs((prev) => prev.filter((mt) => mt !== el));
                      } else {
                        setCategs((prev) => [...prev, el]);
                      }
                    }}
                  />
                  <label for={el}>{el}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container categ">
          <div className="check-table depot categories statistic table">
            <div
              className="table-row"
              style={{
                gridTemplateColumns: `repeat(${categs.length + 1}, 1fr)`,
              }}
            >
              <div className="table-td">{new Date().getFullYear()}</div>

              {Object.values(translate).map((el) => {
                if (categs.includes(el)) {
                  return <div className="table-td">{el}</div>;
                }
              })}
            </div>
            {months.map((mth) => (
              <div
                className="table-row"
                style={{
                  gridTemplateColumns: `repeat(${categs.length + 1}, 1fr)`,
                }}
              >
                <div className="table-td">{monthRU[mth]}</div>
                {Object.keys(translate).map((el) => {
                  if (categs.includes(translate[el])) {
                    return (
                      <div className="table-td">{statistic[mth]?.[el]}</div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="push100"></div>
        <div className="push100"></div>
        <div className="push100"></div>
      </section>
    </>
  );
}
