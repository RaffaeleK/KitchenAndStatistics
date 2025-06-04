import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import {orderType, RecivedOrder } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule, OrderComponent, HeaderComponent, FormsModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit, OnDestroy{

  //const INITIALID = 1
  orders? : RecivedOrder[]
  orderTypeFilter? : orderType
  types? : orderType[]
  private ordersTimer: any;

  constructor(private orderService : OrderService) {

    orderService.getStations().subscribe( 
      {
        next : r => {this.types = r; this.orderTypeFilter = this.types[0]; this.applyFilter();},
        error : r => this.types = [] 
      }
    );

    effect(() => {
      if (this.orderService.reloaded()) {
        this.applyFilter(); 
        this.orderService.reloaded.set(false);
      }
    });

  }
  ngOnInit(): void {
    this.ordersTimer = setInterval(() =>{this.applyFilter()},15000);
  }

  ngOnDestroy(): void {
    if (this.ordersTimer) {
      clearInterval(this.ordersTimer);
    }
  }

  applyFilter()
  {
    this.orderService.getOrdersById(this.orderTypeFilter!.id!).subscribe({
      next: r => {
        // Converti ogni orderDate in ora di Roma
        this.orders = r.map(order => {
          if (order.orderDate) {
            const utcDate = new Date(order.orderDate);
            const romeOffset = new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome', timeZoneName: 'short' }).includes('CEST') ? 2 : 1;
            const romeDate = new Date(utcDate.getTime() + romeOffset * 60 * 60 * 1000);
            return { ...order, orderDate: romeDate };
          }
          return order;
        });
      },
      error: r => this.orders = []
    });
  }

  getSummary() : {[name: string]: number}
  {
    var summary: {[name: string]: number} = {};

    if (this.orders) {
      this.orders.forEach(order => {
        if (summary[order.name!]) {
          summary[order.name!] += order.qty!;
        } else {
          summary[order.name!] = order.qty!;
        }
      });
    }

    return summary
  }
}