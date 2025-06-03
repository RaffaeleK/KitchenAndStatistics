import { Component } from '@angular/core';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-kitchen',
  imports: [OrderComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent {

  orders : Order[]

  constructor(private orderService : OrderService)
  {
    this.orders = orderService.getOrders()
  }
}
