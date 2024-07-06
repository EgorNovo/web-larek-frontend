import { IEvents } from "./events";

export abstract class UIComponent<T> {
  protected readonly container:HTMLElement;
  events: IEvents;

  protected constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;
  }

  protected setTextConten(element:HTMLElement, text:string):void {
    /* Установить текстовое наполнение */
  }

  protected setImage(element:HTMLElement, src:string):void {
    /* Установить ссылку на изображение */
  }

  protected setAlt(element:HTMLElement, alt:string):void {
    /* Установить описание для изображения */
  }

  toggleClass(element: HTMLElement, className: string):void {
    /* Переключение класса элемента */
  }

  toggleDisabled(element: HTMLElement):void {
    /* Переключение состояния элемента в верстке */
  }

  toggleVisible(element: HTMLElement):void {
    /* Скрывать/показывать элемент в верстке */
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container
  }
}