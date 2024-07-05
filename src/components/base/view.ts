export abstract class View<T> {
  element:HTMLElement

  constructor(element: HTMLElement) {
    this.element = element;
  }

  setImage(element:HTMLElement, link:string, alt:string = "Описание заглушка"):void {
    /* Монтируем изображение в элемент */
  }

  setTextContent(element:HTMLElement, content?:object):void {
    /* Устанавливаем textContent при наличии */
  }

  toggleClass(element:HTMLElement, className:string):void {
    /* Переключение класса для элемента */
  }
}