export abstract class UIComponent<T> {
  protected constructor(protected readonly container: HTMLElement) {}

  protected setTextContent(element:HTMLElement, counter:string):void {
     element.textContent = counter;
  }

  protected setDisabled(element:HTMLElement, state:boolean):void {
    state ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled')
  }

  toggleClass(element: HTMLElement, className: string, flag?:boolean):void {
   element.classList.toggle(className, flag)
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container
  }
}