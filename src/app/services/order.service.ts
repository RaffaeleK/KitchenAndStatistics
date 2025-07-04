import { Injectable, signal } from '@angular/core';
import { RecivedOrder, orderType } from '../model/order';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  reloaded = signal(false)
  
  constructor(private http: HttpClient)
  {

  }

  getOrdersById(id: number) : Observable<RecivedOrder[]>{
    return this.http.get<RecivedOrder[]>(environment.apiKitchen + '/kitchen/'+id+'/order').pipe(
      map((data:any) => data.map((item:any) => ({       
          id: item.id,
          productId: item.productId,
          tableId: item.tableId,
          name: item.name,
          qty: item.qty,
          price: item.price,
          orderDate:  <Date>(item.orderDate),
          completionDate: null,
          orderType: { id: id }
      })))
    )
   
  }

  orderDone(id: number, orderIds: number[]): Observable<any> {
    const body = orderIds.map(orderId => ({ id: orderId }));
    console.log(body);
    return this.http.post(environment.apiKitchen + '/kitchen/' + id + '/order', body).pipe(
      map(result => {
        this.reloaded.set(true);
        return result;
      })
    );
  }

  getStations() : Observable<orderType[]>{
    return this.http.get<orderType[]>(environment.apiKitchen + '/kitchen/').pipe(
      map((data:any[]) => data.map((item:any) => ({
        id : item.id,
        name: item.name
      })))
    );
  }
}
