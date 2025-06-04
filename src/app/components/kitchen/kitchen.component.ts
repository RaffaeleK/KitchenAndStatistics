import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, orderType } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule, OrderComponent, HeaderComponent, FormsModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit, OnDestroy{

  //const INITIALID = 1
  orders? : Order[]
  orderTypeFilter? : orderType
  types? : orderType[]
  private ordersTimer: any;
  

  constructor(private orderService : OrderService) {

    orderService.getStations().subscribe( 
      {
        next : r => {this.types = r; this.orderTypeFilter = this.types[0]; this.applyFilter()},
        error : r => this.types = [] 
      }
    );
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

      next : r => this.orders = r,
      error : r => this.orders = []
    })

    
  }

  
}