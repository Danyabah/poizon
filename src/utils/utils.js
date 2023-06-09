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
    "Скайлер",
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
  neworder:"Новый заказ",
  payment: "Проверка оплаты",
  //  buying: 'Оплачен',
  buying: "На закупке",
  bought: "Закуплен",
  china: "На складе в Китае",
  chinarush: "Доставка на склад РФ",
  rush: "На складе в РФ",
  cdek: "Доставляется СДЭК",
  completed: "Завершен",
};

export const stage = {
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
export function addToDraft(values,token) {

  if (window.confirm("Вы уверены что хотите отменить заказ?")) {
    let copy = { ...values };
    // copy.status = "draft";
    delete copy.status;
    axios.patch(`https://crm-poizonstore.ru/checklist/${copy.id}`, {
      status:"draft"
    },{ headers:{
      "Authorization": `Token ${token}`
    }}).then((res) => {
      if (res.status === 200) {
        alert("добавлено в черновик");
      }
      console.log(res);
    });
  }
}
