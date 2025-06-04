import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  @Input() order!: Order;  

  constructor(private orderService : OrderService)
  {
    
  }

  signAsCompleted()
  {
    this.order.completionDate = new Date();
    this.orderService.orderDone(this.order.orderType!.id!, this.order.id!).subscribe()
  }
}
