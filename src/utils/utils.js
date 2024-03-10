import axios from "axios";
import { useSelector } from "react-redux";

export const subcategory = {
  shoes: [
    "Кроссовки",
    "Кеды",
    "Пляжная обувь",
    "Туфли",
    "Босоножки",
    "Сандвли",
    "Лоаферы",
    "Мокасины",
    "Ботинки",
    "Полуботинки",
    "Сапоги",
    "Домашняя обувь",
    "Другое",
  ],
  outerwear: [
    "Куртка летняя",
    "Куртка зимняя",
    "Худи",
    "Толстовка",
    "Футболка",
    "Майка",
    "Лонгслив",
    "Рубашка",
    "Платье",
    "Жилетка",
    "Свитер",
    "Топ",
    "Другое",
  ],
  underwear: [
    "Брюки",
    "Штаны",
    "Джинсы",
    "Леггинсы",
    "Шорты",
    "Юбка",
    "Колготки",
    "Другое",
  ],
  bags: [
    "Женская сумка",
    "Мужская сумка",
    "Рюкзак",
    "Кошелек",
    "Визитница",
    "Клатч",
    "Шоппер",
    "Другое",
  ],
  cosmetics: [
    "Для лица",
    "Для тела",
    "Для губ",
    "Для ресниц",
    "Для волос",
    "Для бровей",
    "Для рук",
    "Для ног",
    "Другое",
  ],
  accessories: [
    "Шарф",
    "Шапка",
    "Кепка",
    "Очки",
    "Украшения",
    "Перчатки",
    "Носки",
    "Нижнее белье",
    "Другое",
  ],
  technics: [
    "Телефон",
    "Планшет",
    "Ноутбук",
    "Приставка",
    "Фен",
    "Стайлер",
    "Пылесос",
    "Увлажнитель",
    "Бытовая техника",
    "Другое",
  ],

  watches: ["Механические", "Электронные"],
  toys: ["Lego", "Фигурка", "Мягкая", "Кукла", "Набор", "Другое"],
  home: ["Полотенце", "Ковер", "Набор", "Косметичка", "Другое"],
  foodndrinks: ["Еда", "Напиток"],
  different: ["Другое"],
};

export const status = {
  draft: "Черновик",
  neworder: "Новый заказ",
  payment: "Проверка оплаты",
  //  buying: 'Оплачен',
  buying: "На закупке",
  bought: "Закуплен",
  china: "Склад Китай",
  chinarush: "Доставка в РФ",
  rush: "Склад РФ",
  cdek: "Доставляется СДЭК",
  completed: "Завершен",
};
export const splitStyle = {
  backgroundColor: "#FFFF99",
  cursor: "pointer",
};
export const notSplitStyle = {
  backgroundColor: "#b1ff9a",
  cursor: "pointer",
};
export const getDif = (product) => {
  return (product?.curencycurency2 - product?.realprice) * product?.currency;
};
export const stage = {
  draft: -1,
  neworder: 0,
  payment: 1,
  buying: 2,
  bought: 3,
  china: 4,
  chinarush: 5,
  rush: 6,
  READY_FOR_SHIPMENT_IN_SENDER_CITY: 7,
  cdek: 7,
  completed: 8,
  DELIVERED: 8,
};

export const translate = {
  shoes: "Обувь",
  outerwear: "Верхняя одежда",
  underwear: "Нижняя одежда",
  bags: "Сумки",
  cosmetics: "Косметика",
  accessories: "Аксессуары",
  technics: "Техника",
  watches: "Часы",
  toys: "Игрушки",
  home: "Товары для дома",
  foodndrinks: "Еда и напитки",
  different: "Другое",
};

export const translatePay = {
  tink: "Тинькофф",
  alfa: "Альфабанк",
  ralf: "Райффайзенбанк",
  sber: "Сбербанк",
};

export const deliveryName = {
  "Курьерская доставка CDEK": "Курьер СДЭК",
  "Пункт выдачи заказов CDEK": "ПВЗ СДЭК",
  "Самовывоз из шоурума": "Самовывоз",
};

export function addToDraft(values, token) {
  if (values?.split_payment_proof && stage[values.status] <= 6) {
    let copy = { ...values };

    axios
      .patch(
        `https://crm-poizonstore.ru/checklist/${copy.id}`,
        {
          split_payment_proof: null,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Отклонено");
        }
        console.log(res);
      });
  } else if (window.confirm("Вы уверены что хотите отменить заказ?")) {
    let copy = { ...values };
    // copy.status = "draft";
    delete copy.status;
    axios
      .patch(
        `https://crm-poizonstore.ru/checklist/${copy.id}`,
        {
          status: "draft",
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("добавлено в черновик");
        }
        console.log(res);
      });
  }
}
export const parseTg = (tg) => {
  if (tg.startsWith("@")) {
    return `https://t.me/${tg.slice(1)}`;
  } else if (tg.startsWith("t.me")) {
    return `https://t.me/${tg.split("/")[1]}`;
  } else if (tg.startsWith("https")) {
    return tg;
  } else {
    return `https://t.me/${tg}`;
  }
};
export const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthRU = {
  January: "Январь",
  February: "Февраль",
  March: "Март",
  April: "Апрель",
  May: "Май",
  June: "Июнь",
  July: "Июль",
  August: "Август",
  September: "Сентябрь",
  October: "Октябрь",
  November: "Ноябрь",
  December: "Декабрь",
};

export const parseSeconds = (timer) =>
  new Date(timer * 1000).toISOString().slice(11, 19);

// export const allUppers = (string) => {
//   let arr = string.split(" ");
//   console.log(arr);
//   return arr
//     .map((e) => {
//       console.log(e[0]);
//       console.log(e[0] === "«");

//       if (
//         e[0] !== '"' &&
//         e[0] !== "'" &&
//         e[0] !== "«" &&
//         e[0] !== "-" &&
//         e[0] !== ""
//       ) {
//         return e[0].toUpperCase() + e.slice(1);
//       } else {
//         if (e[0] === "«") {
//           return e[0] + e[2].toUpperCase() + e.slice(3);
//         }
//         return e[0] + e[1].toUpperCase() + e.slice(2);
//       }
//     })
//     .join(" ");
// };

export const getStyle = (full, product) => {
  if (!full?.id || !product?.id) {
    return;
  }
  if (full.id == product.id) {
    return {
      border: "1px solid #246fff",
    };
  } else {
    return {};
  }
};

export const toDataUrl = (url, callback) => {
  if (!url.startsWith("https://")) {
    callback(url);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};
