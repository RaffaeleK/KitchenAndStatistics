import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders : Order[] = [
    {
      id:1, productId: 18, tableId:6, name: "Tuna", qty: 3, price: 31, orderDate: new Date, completionDate: new Date 
    },
    {
      id:2, productId: 42, tableId:9, name: "Ugolini", qty: 5, price: 43, orderDate: new Date, completionDate: new Date 
    }
  ]
  
  constructor()
  {

  }

  getOrders() {
    return this.orders
  }


}
