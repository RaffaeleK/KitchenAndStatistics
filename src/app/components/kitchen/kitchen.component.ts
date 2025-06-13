import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import {OrderGroup, orderType, RecivedOrder } from '../../model/order';
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
  orderGroups? : OrderGroup[]
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
    this.ordersTimer = setInterval(() => {this.applyFilter()}, 10000);
  }

  ngOnDestroy(): void {
    if (this.ordersTimer) {
      clearInterval(this.ordersTimer);
    }
  }

  applyFilter()
  {
    this.orderService.getOrdersById(this.orderTypeFilter!.id!).subscribe({
      next: r => {this.orders = r; this.orderGroups = this.buildOrderGroups(r)},
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

  getOrdersByTime(orders: RecivedOrder[]) : RecivedOrder[][]
  {
    // Usa una mappa per raggruppare per tavolo, ora e minuto
    const groups: { [key: string]: RecivedOrder[] } = {};

    for (const order of orders) {
      const date = new Date(order.orderDate!);
      // Chiave: tavolo_ora_minuto
      const key = `${order.tableId}_${date.getHours()}_${date.getMinutes()}`;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(order);
    }

    // Trasforma la mappa in un array di array
    return Object.values(groups);
  }

  buildOrderGroups(orders: RecivedOrder[]) : OrderGroup[]
  {
    var orderGroups : OrderGroup[] = []
    var ordersByTime = this.getOrdersByTime(orders)
    
    for(let i = 0; i < ordersByTime.length; i++)
    {
      var currentOrder = ordersByTime[i][0] as OrderGroup
      currentOrder.names = [];
      currentOrder.ids = [];
      currentOrder.qtys = [];

      for(let j = 0; j < ordersByTime[i].length; j++)
      {
        if(currentOrder.names?.includes(ordersByTime[i][j].name!))
        {
          currentOrder.qtys![currentOrder.names.indexOf(ordersByTime[i][j].name!)] += ordersByTime[i][j].qty!
        }
        else
        {
          currentOrder.names?.push(ordersByTime[i][j].name!)
          currentOrder.qtys?.push(ordersByTime[i][j].qty!)
        }

        currentOrder.ids?.push(ordersByTime[i][j].id!)
      }

      orderGroups?.push(currentOrder)
    }

    return orderGroups
  }
}