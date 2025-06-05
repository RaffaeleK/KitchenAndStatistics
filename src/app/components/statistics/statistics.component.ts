import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Table } from '../../model/table';
import { OrderStats } from '../../model/order';
import { environment } from '../../../enviroments/enviroment';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  imports: [FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  tables: Table[] = [];
  orders: OrderStats[] = [];

  mostOrdered: string = "";

  requestedOrders: Map<string, number> = new Map<string, number>();

  constructor(private statsService: StatsService, private auth: AuthService, private router: Router) { 
    statsService.getTables().subscribe(r => this.tables = r)
    statsService.getOrdersStats().subscribe(r => {this.orders = r.filter(r => r.category != "Beverages"); this.fillAndOrganiseOrdersByPeople()});
    
  }
  
  getAllOccupietedTable(): number{
    return this.tables.filter(t => t.occupied).length;
  }

  getNumberOfCustomers(): number{
    let numOfCust = 0;

    this.tables.forEach(t => {
      if(t.occupied)
        numOfCust += t.occupants!;
    })

    return numOfCust;
  }

  getWaitingOrders(): number{
    let waitingOrders = 0;

    this.orders.forEach( o =>{
      if(o.completionDate == null)
        waitingOrders++;
    })

    return waitingOrders;
  }

  
  getPreparedOrders(): number{
    let preparedOrders = 0;

    this.orders.forEach( o =>{
      if(o.completionDate != null)
        preparedOrders++;
    })

    return preparedOrders;
  }

  getMostOrderedDish(): string  {
    this.mostOrdered = this.requestedOrders.keys().next().value!;
    return this.findDish(this.mostOrdered);
  }

  getFirstFiveOrderedDish(): string[] {
    let orderedDishes: string[] = [];
    let count = 0;

    this.requestedOrders.forEach((value, key) => {
      if (count < 5) {
        console.log(key + " " + value)
        orderedDishes.push(key);
        count++;
      }
    });

    console.log(orderedDishes)
    return orderedDishes;
  }

  findDish(name: string): string{
    console.log(environment.apiImage + this.orders.find(o => o.name == name)!.image!)
    return environment.apiImage + this.orders.find(o => o.name == name)!.image!;
  }

  fillAndOrganiseOrdersByPeople(){   

    this.orders.forEach(order => {
      if (this.requestedOrders.has(order.name!)) {
        this.requestedOrders.set(order.name!, order.qty! + this.requestedOrders.get(order.name!)!);
      } else {
        this.requestedOrders.set(order.name!, order.qty!)
      }
    });
    
    //trovare un modo di spiegarlo
    const sortedArray = Array.from(this.requestedOrders.entries())
    .sort((a, b) => b[1] - a[1]);

    this.requestedOrders = new Map<string, number>(sortedArray);
  }

  Logout():void {
    this.auth.logout().subscribe(() => this.router.navigate(['login']))
  }
}
