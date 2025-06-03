import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order, orderType } from '../../model/order';
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
export class KitchenComponent {

  orders : Order[]
  orderTypeFilter? : orderType[]
  types? : orderType[]

  constructor(private orderService : OrderService) { 
    this.orders = orderService.getOrders()
  }

  applyFilter()
  {

  }
}