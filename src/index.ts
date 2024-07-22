import { Modal } from './components/common/Modal';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { LarekAPI } from './components/larekAPI';
import { App } from './components/model/App';
import { BasketUI } from './components/view/basket';
import { CardUI } from './components/view/card';
import './scss/styles.scss';
import { paymentMethod, uniqueId } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PaymentFormUI } from './components/view/paymentForm';
import { ContactFormUI } from './components/view/contactForm';
import { SuccesUI } from './components/view/succes';
import { IErrors } from './components/model/order';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Установим слушатель событий  
events.onAll( event => {
  console.log(event.eventName, event.data)
})

//Все шаблоны 
const templateSuccess       = ensureElement<HTMLTemplateElement>('#success');
const templateCardCatalog   = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview   = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket    = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket        = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder         = ensureElement<HTMLTemplateElement>('#order');
const templateContacts      = ensureElement<HTMLTemplateElement>('#contacts');

//Находим модальное окно
const modalDiv              = ensureElement<HTMLElement>('#modal-container');  

//Модель данных приложения, храним тут всю основную информацию и бизнесс логику 
const app = new App({}, events);

//Глобальный контейнер View
const page = new Page(document.body, events);
//Модальное окно 
const modal = new Modal(modalDiv, events);
//Корзина и формы 
const basket = new BasketUI(cloneTemplate(templateBasket), events);
const paymentForm = new PaymentFormUI(cloneTemplate(templateOrder), events);
const contactForm = new ContactFormUI(cloneTemplate(templateContacts), events)


//Монтируем карточки если поменяется хранилище карточек (пришли карточки с api)
events.on('items:chenges', () => {
  page.catalog = app.catalog.map( item => {
    const view = new CardUI(cloneTemplate(templateCardCatalog), events);
    
    return view.render({
      category: item.category,
      title: item.title,
      price: item.price,
      image: item.image,
      id: item.id
    });
  })
});

//Открытие модального окна карточки, при выборе карточки в каталоге 
events.on('card:selected', (data: { cardId:uniqueId }) => {
  const card = new CardUI(cloneTemplate(templateCardPreview), events);
  const [cardData] = app.catalog.filter( card => card.id === data.cardId )

  modal.render({
    content: card.render({
      category: cardData.category,
      title: cardData.title,
      description: cardData.description,
      price: cardData.price,
      image: cardData.image,
      id: cardData.id,
      inBasket: cardData.price === null || app.basket.some( item => item.id === cardData.id)
    })
  })

  modal.open();
});

//Добавляем карточку в корзину
events.on('card:addBasket', (data: { cardId:uniqueId }) => { 
  app.basket.push(app.catalog.filter( card => card.id === data.cardId)[0] )
  page.counter = app.basket.length;

  basket.list = app.basket.map( (item, i) => {
    const card = new CardUI(cloneTemplate(templateCardBasket),events);

    return card.render({
      title: item.title,
      price: item.price,
      id: item.id
    })
  })

  modal.close()
})

//Удаляем карточку из корзины
events.on('card:removeBasket', (data: { cardId:uniqueId }) => {
  app.basket = app.basket.filter( item => item.id !== data.cardId);
  basket.list = app.basket.map( (item, i) => {
    const card = new CardUI(cloneTemplate(templateCardBasket),events);

    return card.render({
      title: item.title,
      price: item.price,
      id: item.id
    })
  } )

  page.counter = app.basket.length;
  basket.price = app.setPrice();
  basket.renderWithIndex({ valid: app.basket.length > 0 });
})

//Открываем корзину
events.on('basket:open', () => {
  modal.render({
    content: basket.renderWithIndex({ valid: app.basket.length > 0 })
  })

  basket.price = app.setPrice();
  modal.open();
})

//Работа с формами 
//Форма выбора метода доставки и адреса
events.on('payment:open', () => {
  const order = app.initOrder();
  modal.render({
    content: paymentForm.render({
      paymentMethod: order.paymentMethod,
      address: order.address,
      valid: false,
      errors: []
    })
  })

  modal.open();
})

//Выбор способа оплаты
events.on('paymentMethod:change', (data: { target:string }) => {
  app.order.paymentMethod = data.target as paymentMethod;
})
//Задаем адес доставки
events.on('order.address:change', (data: { value:string }) => {
  app.order.address = data.value;
})
//Задаем почту
events.on('contacts.email:change', (data: { value:string }) => {
  app.order.email = data.value;
})
//Задаем номер телефона
events.on('contacts.phone:change', (data: { value:string }) => {
  app.order.phone = data.value;
}) 

//Ввывод ошибки формы 
events.on('errors:changed', (errors: IErrors) => {
  paymentForm.valid = !errors.paymentMethodError && !errors.addressError;
  contactForm.valid = !errors.phoneError && !errors.emailError;

  paymentForm.errors = `${errors.paymentMethodError}  ${errors.addressError}`;
  contactForm.errors = `${errors.phoneError}  ${errors.emailError}`;
})

//Открываем форму с контактами 
events.on('order:submit', () => {
  const order = app.order;
  modal.render({
    content: contactForm.render({
      email: order.email,
      phone: order.phone,
      valid: false,
      errors: []
    })
  })

  modal.open();
})

//Оформление заказа
events.on('contacts:submit', () => {  
  //В работе нет работы с api, где мы могли бы получить ответ от сервера о успешном\неуспешном оформлении заказа - выведем финальный заказ в консоль
  const order = app.order;
  order.items = app.basket;

  console.table({
    email: order.email,
    phone: order.phone,
    address: order.address,
    method: order.paymentMethod,
    items: order.items
  })

  //Откроем модальное окно с информацией о успешном оформлении заказа
  const succes = new SuccesUI(cloneTemplate(templateSuccess), events); 
  succes.message = String(app.setPrice());

  modal.render({
    content: succes.render()
  })

  order.clearOrder();
  app.clearBasket();
  basket.list = [];
  page.counter = 0

  modal.open();
})

//Блокируем экрн при открытии модального окна
events.on('modal:open', () => {
  page.block = true;
})
//Разблокируем экрн при закрытии модального окна
events.on('modal:close', () => {
  page.block = false;
})
//Закрытие окна с информацие о успешном оформлении заказа
events.on('succes:close', () => {
  modal.close();
})

// Получаем лоты с серера и рисуем на странице 
api.getCardList()
  .then(data => {
    app.setCatalog(data)
  })
  .catch(err => {
    console.log(err)
  })

