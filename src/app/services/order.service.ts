import { Injectable } from '@angular/core';
import { Order, orderType } from '../model/order';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviromennt';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(private http: HttpClient)
  {

  }

  getOrdersById(id: number){
    return this.http.get<Order[]>(environment.apiKitchen + 'kitchen/'+id+'/order').pipe(
      map((data:any) => data.map((item:any) => {
        return{
          id: item.id,
          productId: item.productId,
          tableId: item.tableId,
          name: item.name,
          qty: item.qty,
          price: item.price,
          orderDate:  <Date>(item.orderDate),
          completionDate: null
        }
      }))
    )
   
  }

  orderDone(id: number, orderId: number){
    this.http.post(environment.apiKitchen + 'kitchen/'+id+'/order', `[{"id": ${orderId}}]`)
  }

  getStations(){
    return this.http.get<orderType[]>(environment.apiKitchen + 'kitchen/').pipe(
      map((data:any) => data.map((item:any) => {
        return{
          name: item.name
        }
      }))
    )
  }


}
