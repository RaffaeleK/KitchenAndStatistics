import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  @Input() order!: Order;
}
