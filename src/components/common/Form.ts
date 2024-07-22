import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { UIComponent } from '../base/view'

export interface IForm {
  valid: boolean,
  errors: string[]
}

export class Form<T> extends UIComponent<IForm> {
  protected _buttonSubmit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container:HTMLFormElement, protected events:IEvents) {
    super(container)

    this._buttonSubmit = ensureElement<HTMLButtonElement>('button[type=submit]', container);
    this._errors       = ensureElement<HTMLElement>('.form__errors', container);

    container.addEventListener('input', (evt) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;

      this.onInputChahge(field, value)
    })

    container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      events.emit(`${container.name}:submit`)
    })
  }

  onInputChahge(field:string, value:string) {
    this.events.emit(`${this.container.name}.${field}:change`, {field, value})
  }

  set valid( valid:boolean ) {
    this.setDisabled(this._buttonSubmit, !valid)
  }

  set errors( value:string ) {
    this.setTextContent(this._errors, value)
  }

  render(state: Partial<T> & IForm): HTMLFormElement {
    const {valid, errors, ...data} = state;
    super.render({valid, errors});
    Object.assign(this, data);

    return this.container;
  }
}