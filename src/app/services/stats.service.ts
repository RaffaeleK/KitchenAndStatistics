import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Table } from '../model/table';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { OrderStats } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }


  getTables() : Observable<Table[]>{
      return this.http.get<Table[]>(environment.apiKitchen + '/stats/tables').pipe(
        map((data:any) => data.map((item:any) => ({       
            id: item.id,
            occupied: item.occupied,
            occupancyDate: <Date>(item.occupancyDate),
            occupants: item.occupants,
            tableKey: item.tableKey
        })))
      )
  }

  getOrdersStats() : Observable<OrderStats[]>{
      return this.http.get<OrderStats[]>(environment.apiKitchen + '/stats/order').pipe(
        map((data:any) => data.map((item:any) => ({       
            image: item.image,
            id: item.id,
            productId: item.productId,
            name: item.name,
            qty: item.qty,
            category: item.category,
            price: item.price,
            orderDate: <Date>(item.orderDate),
            completionDate: item.completionDate ? <Date>(item.completionDate) : null
        })))
      )
  }
}
