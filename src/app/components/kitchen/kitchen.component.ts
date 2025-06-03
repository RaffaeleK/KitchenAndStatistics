import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule, OrderComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit, OnDestroy{

  orders : Order[]

  dateTime: Date;
  private timer: any;

  constructor(private orderService : OrderService) {
    this.dateTime = new Date();
    this.orders = orderService.getOrders()
  }
  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.dateTime = new Date();
    },1000);
  }
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}