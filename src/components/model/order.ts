import { Model } from '../../components/base/model'
import { ICard, paymentMethod } from '../../types/index'
import { IOrder } from '../../types/model/order';

var validate = require("validate.js");

export interface IErrors {
  paymentMethodError: string,
  emailError: string,
  phoneError: string,
  addressError: string,
}

export class Order extends Model<IOrder> {

  protected _paymentMethod: paymentMethod = 'online';
  protected _address: string = '';
  protected _email: string = '';
  protected _phone: string = '';
  protected _items: ICard[] = [];
  protected _errors: IErrors = {
    paymentMethodError: '',
    addressError: '',
    phoneError: '',
    emailError: ''
  };

  set paymentMethod( method:paymentMethod ) {
    this._paymentMethod = method;
    this.validatePaymentMethod();
  }

  get paymentMethod() {
    return this._paymentMethod;
  }

  set address( address:string ) {
    this._address = address;
    this.validateAddress();
  }

  get address() {
    return this._address;
  }

  set email( email:string ) {
    this._email = email;
    this.validateMail();
  }

  get email() {
    return this._email;
  }

  set phone( phone:string ) {
    this._phone = phone;
    this.validatePhone();
  }

  get phone() {
    return this._phone;
  }

  set items( items:ICard[] ) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  validatePaymentMethod():void {
    if(!this._paymentMethod) {
      this._errors.paymentMethodError = "Выберете способ оплаты"
    } else {
      this._errors.paymentMethodError = '';
    }

    this.emitChanges('errors:changed', this._errors);
  }

  validateAddress():void {
    if(!this._address) {
      this._errors.addressError = "Введите адрес доставки"
    } else {
      this._errors.addressError = '';
    }

    this.emitChanges('errors:changed', this._errors);
  }

  validateMail():void {
    if(!this.email) {
      this._errors.emailError = "Введите почту"
    } else {
      this._errors.emailError = '';
    }

    this.emitChanges('errors:changed', this._errors);
  }

  validatePhone():void {
    if(!this._phone) {
      this._errors.phoneError = "Введите телефон"
    } else {
      this._errors.phoneError = '';
    }

    this.emitChanges('errors:changed', this._errors);
  }

  clearOrder():void {
    this._paymentMethod = 'online';
    this._address = '';
    this._email = '';
    this._phone = '';
  }

  applyOrder():void {
    this.clearOrder();
    this.emitChanges('order:apply')
  }
 }