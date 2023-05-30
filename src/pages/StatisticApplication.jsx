import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function StatisticApplication() {
  const [statistic, setStatistic] = useState({});
  useEffect(() => {
    axios.get(`http://45.84.227.72:5000/statistic`).then((data) => {
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
            <div className="title">Статистика по заявкам</div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic table">
            <div className="table-row">
              <div className="table-td">{new Date().getFullYear()}</div>
              <div className="table-td">Количество заявок</div>
              <div className="table-td">Количество выполненных заказов</div>
              <div className="table-td">Сумма выкупа в юанях</div>
              <div className="table-td">Сумма выкупа в рублях</div>
              <div className="table-td">Комиссия заработанная</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
              <div className="table-td">
                {statistic["January"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["January"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["January"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["January"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["January"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Февраль</div>
              <div className="table-td">
                {statistic["February"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["February"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["February"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["February"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["February"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Март</div>
              <div className="table-td">{statistic["March"]?.CountOrders}</div>
              <div className="table-td">
                {statistic["March"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["March"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["March"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["March"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Апрель</div>
              <div className="table-td">{statistic["April"]?.CountOrders}</div>
              <div className="table-td">
                {statistic["April"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["April"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["April"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["April"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Май</div>
              <div className="table-td">{statistic["May"]?.CountOrders}</div>
              <div className="table-td">{statistic["May"]?.CountComplete}</div>
              <div className="table-td">
                {Math.round(statistic["May"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["May"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["May"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Июнь</div>
              <div className="table-td">{statistic["June"]?.CountOrders}</div>
              <div className="table-td">{statistic["June"]?.CountComplete}</div>
              <div className="table-td">
                {Math.round(statistic["June"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["June"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["June"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Июль</div>
              <div className="table-td">{statistic["July"]?.CountOrders}</div>
              <div className="table-td">{statistic["July"]?.CountComplete}</div>
              <div className="table-td">
                {Math.round(statistic["July"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["July"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["July"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Август</div>
              <div className="table-td">{statistic["August"]?.CountOrders}</div>
              <div className="table-td">
                {statistic["August"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["August"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["August"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["August"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Сентябрь</div>
              <div className="table-td">
                {statistic["September"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["September"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["September"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["September"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["September"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Октябрь</div>
              <div className="table-td">
                {statistic["October"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["October"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["October"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["October"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["October"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Ноябрь</div>
              <div className="table-td">
                {statistic["November"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["November"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["November"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["November"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["November"]?.SumCommission, 2)}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Декабрь</div>
              <div className="table-td">
                {statistic["December"]?.CountOrders}
              </div>
              <div className="table-td">
                {statistic["December"]?.CountComplete}
              </div>
              <div className="table-td">
                {Math.round(statistic["December"]?.SumOrders1, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["December"]?.SumOrders2, 2)}
              </div>
              <div className="table-td">
                {Math.round(statistic["December"]?.SumCommission, 2)}
              </div>
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
