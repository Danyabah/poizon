import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";

export default function StatisticNumber() {
  const [statistic, setStatistic] = useState({});
  const token = useSelector((state)=>state.user.token)
  useEffect(() => {
    axios
      .get(`https://crm-poizonstore.ru//statistics/clients/`,{ headers:{
        "Authorization": `Token ${token}`
      }})
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
            <div className="title">
              Статистика с количеством людей, сделавших более определенного
              количества заказов
            </div>
          </div>
          <div className="push50 hidden-xss"></div>
          <div className="push20 visible-xss"></div>
        </div>
        <div className="container">
          <div className="check-table depot statistic table number">
            <div className="table-row">
              <div className="table-td">{new Date().getFullYear()}</div>
              <div className="table-td">Более 1</div>
              <div className="table-td">Более 2</div>
              <div className="table-td">Более 3</div>
              <div className="table-td">Более 4</div>
              <div className="table-td">Более 5</div>
              <div className="table-td">Более 10</div>
              <div className="table-td">Более 25</div>
              <div className="table-td">Более 50</div>
            </div>
            <div className="table-row">
              <div className="table-td">Январь</div>
              <div className="table-td">
                {statistic["January"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["January"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Февраль</div>
              <div className="table-td">
                {statistic["February"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["February"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Март</div>
              <div className="table-td">
                {statistic["March"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["March"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Апрель</div>
              <div className="table-td">
                {statistic["April"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["April"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Май</div>
              <div className="table-td">{statistic["May"]?.moreone.length}</div>
              <div className="table-td">{statistic["May"]?.moretwo.length}</div>
              <div className="table-td">
                {statistic["May"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["May"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["May"]?.morefive.length}
              </div>
              <div className="table-td">{statistic["May"]?.moreten.length}</div>
              <div className="table-td">
                {statistic["May"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["May"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Июнь</div>
              <div className="table-td">
                {statistic["June"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["June"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Июль</div>
              <div className="table-td">
                {statistic["July"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["July"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Август</div>
              <div className="table-td">
                {statistic["August"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["August"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Сентябрь</div>
              <div className="table-td">
                {statistic["September"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["September"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Октябрь</div>
              <div className="table-td">
                {statistic["October"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["October"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Ноябрь</div>
              <div className="table-td">
                {statistic["November"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["November"]?.morefifty.length}
              </div>
            </div>
            <div className="table-row">
              <div className="table-td">Декабрь</div>
              <div className="table-td">
                {statistic["December"]?.moreone.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.moretwo.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.morethree.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.morefour.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.morefive.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.moreten.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.moretwentyfive.length}
              </div>
              <div className="table-td">
                {statistic["December"]?.morefifty.length}
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
