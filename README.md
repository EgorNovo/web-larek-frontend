# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Архитектура проекта - MVP

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
Для публикации страницы на gitHub-pages необходимо выполнить команду

```
"deploy": "gh-pages -d dist"
```

## Описание работы

![alt text](<2024-07-06 22.28.20.jpg>)

# Типизация

## Типизация Model
interface IBasket  - интерфейс описывающий корзину и методы для работы с ней.
Корзина содержит перечень товаров.
```
export interface IBasket {
  items: ICard[];
}
```
interface IApp  - интерфейс описывающий работу приложения, хранение данных, работа с формами и другие методы.

```
export interface IApp {
  order: IOrder,

  getCollections(): void,
  checkValidInpit(): void,
  clearBasket(): void,
  setBasketCounter(): void,

  /* ... */

}
```

interface IOrder  - интерфейс описывающий заказ, список товаров, работа с оформлением заказа.

```
export interface IOrder {
  items: ICard[],
  applyOrder():Promise<object>
  /* ... */
}
```

## Типизация View

interface IBasketUI  - интерфейс описывающий форму корзины.

```
export interface IBasketUI {
  items: HTMLElement[],
  price: number
}
```

interface ICardUI  - интерфейс описывающий popup с карточкой.

```
export interface ICardUI {
  category: string,
  title: string,
  description: string,
  price: number | null,
  image: string
}
```

interface IContantFormUI  - интерфейс описывающий форму с контактной информацией.

```
export interface IContantFormUI {
  mail: string
  phone: string,
}
```

interface IPaymentFormUI  - интерфейс описывающий форму с адресом и методом оплаты.

```
export interface IPaymentFormUI {
  paymentMethod: paymentMethod,
  adress: string
}
```

interface ISuccesUI  - интерфейс описывающий popup с сообщение о успешном оформлении заказа.

```
export interface ISuccesUI {
  /* сообщение о статусе оплаты */
  text: string
}
```

# Модель 
## Классы
### Базовый class Api
Данный класс предназначен для работы с Api, поля класса `baseUri` и `options`.
Методы класса: 
  1) `handleResponse` - обработчик ответа сервера
  2) `get` - делаем запрос на сервер
  3) `post` - отправляем изменения на сервер🤷‍♂️

### Базовый class EventEmmiter
Класс для подписки на события, брокер событий. Поля класса - `_events`.
Методы класса:
  1) `on` - Установить обработчик на событие 
  2) `off` - Снять обработчик с события
  3) `emit` - Инициировать событие с данными
  4) `onAll` - Слушать все события
  5) `offAll` - Сбросить все обработчики
  6) `trigger` - Сделать коллбек триггер, генерирующий событие при вызове 

### Базовый абстрактный class Model
Класс для компонентов модели данных, позволяет связывает Model с presenter. Поля класса - `data`.
Методы класса:
  1) `event` - Вызов события 

### Базовый абстрактный class UIComponent
Класс для компонентов отвечающих за отображение, позволяет связывает View с presenter. Поля класса - `events`, `container`.
Методы класса:
  1) `setTextConten` - Установить текстовое наполнение 
  2) `setImage` - Установить ссылку на изображение
  3) `setAlt` - Установить описание для изображения
  4) `toggleClass` - Переключение класса элемента
  5) `toggleDisabled` - Переключение состояния элемента в верстке
  6) `toggleVisible` - Скрывать/показывать элемент в верстке 
  7) `render` - Рендер элемента


Также в проекте частично реализованы классы для View и Model, код находится в дериктории `/src/components`

### 🤯 