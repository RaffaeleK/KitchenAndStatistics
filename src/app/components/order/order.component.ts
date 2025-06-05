import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import {RecivedOrder } from '../../model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  @Input() order!: RecivedOrder;  
  offset = new Date().getTimezoneOffset();

  constructor(private orderService : OrderService)
  {
    if(this.order)
    {
      //this.actualDate = this.order.orderDate!.getTime() + new Date().getTimezoneOffset()
    }
  }

  signAsCompleted()
  {
    this.order.completionDate = new Date();
    this.orderService.orderDone(this.order.orderType!.id!, this.order.id!).subscribe()
  }

  isOrderWarning(): boolean {

    return this.getDiffMs() > 10 * 60 * 1000;
  }

  isOrderDanger() : boolean {
    return this.getDiffMs() > 15 * 60 * 1000;
  }

  getDiffMs() : number
  {
    if (!this.order.orderDate) return 0;

    let orderDate: Date;

    if (typeof this.order.orderDate === 'string') {
      const orderDateStr = this.order.orderDate as string;
      const isoString = orderDateStr.endsWith('Z') ? orderDateStr : orderDateStr + 'Z';
      orderDate = new Date(isoString);
    } else {
      orderDate = this.order.orderDate;
    }

    return new Date().getTime() - orderDate.getTime();
  }

  getOrderTime(orderDate: string | Date): string {
    if (!orderDate) return '';
    
    let date: Date;
    if (typeof orderDate === 'string') {
      const isoString = orderDate.endsWith('Z') ? orderDate : orderDate + 'Z';
      date = new Date(isoString);
    } else {
      date = orderDate;
    }
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Rome'
    });
  }
}
