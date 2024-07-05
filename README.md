# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

и открыть в браузере страницу по адресу http://localhost:8080
## Сборка

```
npm run build
```

## Публикация страницы 
Для публикации стрнаицы на gitHub-pages необходимо выполнить команду

```
"deploy": "gh-pages -d dist"
```

## Описание работы
# Типизация

![alt text](<interface & type.jpg>)

interface IBasket  - интерфейс описывающий корзину и методы для работы с ней.
Корзина содержит перечень товаров и итоговую стоимость.
```
export interface IBasket {
  //Уникальные товары в корзине 
  items: Map<IProduct, number>;
  totalPrice: number;
}
```

interface IOrderOptions - интерфейс описывает данные для работы с первым модальным окном (окно выбора способа оплаты и указание адреса)

interface IContant - интерфейс описывает данные для работы с вторым модальным окном (контакты пользователя)

interface IOrder extends IContant, IOrderOptions - интерфейс описывает уникальные данные для заказа и включает в себя всю информацию о нем 
```
export type paymentMethod = "online" | "receive"; 
export type orderStatus   = "accept" | "decline" | "delivery" | "create";

//Интерфейс для работы с обьектом, в котором находятся только адрес и способ оплаты
export interface IOrderOptions {
  adress: string;
  payment: paymentMethod;
}

//Интерфейс для работы с обьектом, в котором находятся только контактные данные
export interface IContant {
  mail: string;
  phone: string;
}

//Интерфейс для заказа
export interface IOrder extends IContant, IOrderOptions {
  id: uniqueId;
  status: orderStatus;
  items: IProduct[];
}
```

interface IProduct - интрерфейс описывает данные одной карточки товара, данные получаем по API
```
export interface IProduct {
  id: uniqueId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```
interface IPage - интерфейс описывает страницу сайта 
```
export interface IPage {
  basket: IBasket;
  gallery: IProduct[] | [];
}
```

Также представлены интегрфейсы для Api, EventEmitter и type alias

# Модель 
## Классы
### class Api
Данный класс предзнозначен для работы с Api, поля класса `baseUri` и `options`.
Методы класса: 
  1) `handleResponse` - обработчик ответ сервера
  2) `get` - делаем запрос на сервер
  3) `post` - отправляем изменения на сервер🤷‍♂️

### class EventEmmiter
Класс для подписки на события, брокер событий. Поля класса - `_events`.
Методы класса:
  1) `on` - Установить обработчик на событие 
  2) `off` - Снять обработчик с события
  3) `emit` - Инициировать событие с данными
  4) `onAll` - Слушать все события
  5) `offAll` - Сбросить все обработчики
  6) `trigger` - Сделать коллбек триггер, генерирующий событие при вызове 

### class Basket
Класс для реализации корзины. Хранит актуальное состояние корзины, реализует пользовательские сценарии.
Поля класса - `items` и `totalPrice`
Методы класса:
  1) `remove` -  Удаление карточки, по нажатию на кнопку корзины 
  2) `getTotalPrice` - Расчет итоговой суммы товаров в корзине
  3) `applyOrder` - Обработка заказа
  4) `clearBasket` - Очистка корзины

### class Order
Класс для реализации заказа. Хранит актуальное состояние заказа, информацию о товарах, контактах и данных доставки.
Поля класса `id`, `adress`, `mail`, `phone`, `payment`, `status`, `items`
Методы класса:
  1) `setOptions` -  Задаем значение для метода оплаты и адреса 
  2) `setContact` - Задаем значение для почты и телефона
  3) `setStatus` - Задаем значение для статуса заказа
  4) `setItems` - Задаем список покупок
  5) `changeStatus` - Проверяем и меняем стату заказа

### class Product
Класс для реализации экземпляров карточи товара. Хранит данные карточки полученные по API.
Поля класса `id`, `description`, `image`, `title`, `category`, `price`
Методы класса:
  1) `addinBasket` -  Добавление карточки в корзину 

### class Page
Класс для реализации страницы. Хранит актуальные данные о колекции карточек и корзине.
Поля класса `basket`, `gallery`
Методы класса:
  1) `renderGallery` -  Добавляем карточки товаров на страницу 
  2) `setCounterBasket` -  Устанавливаем счетчик товаров в корзине в верстке 
  3) `removeActiveCard` -  Удаляем карточку из коллекции, которую добавили в корзину 
  4) `checkDuplicate` -  Проверяем наличик дубликата карточки в корзине 
