import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class StatisticsComponent implements OnInit, OnDestroy {
  tables: Table[] = [];
  orders: OrderStats[] = [];

  occupiedTables: number = 0;
  nCostumers: number = 0;
  waitingDishes: number = 0;
  preparedDishes: number = 0;
  mostOrderedDish: string = "";
  firstFiveOrderedDishes: string[] = [];

  timer:any;
  mostOrdered: string = "";

  requestedOrders: Map<string, number> = new Map<string, number>();

  constructor(private statsService: StatsService, private auth: AuthService, private router: Router) { 
    this.callAPIs();
  }

  callAPIs(){
    this.statsService.getTables().subscribe(r => {this.tables = r; this.updateConstumersAndTables()} )
    this.statsService.getOrdersStats().subscribe(r => {this.orders = r.filter(r => r.category != "Beverages"); this.fillAndOrganiseOrdersByPeople(); this.updateData();});
  }

  updateConstumersAndTables(){
    this.occupiedTables = this.getAllOccupietedTable();
    this.nCostumers = this.getNumberOfCustomers();
  }

  updateData(){
    this.waitingDishes = this.getWaitingDishes();
    this.preparedDishes = this.getPreparedDishes();
    this.mostOrderedDish = this.getMostOrderedDish();
    this.firstFiveOrderedDishes = this.getFirstFiveOrderedDish();
  }

  ngOnInit(): void {
    this.timer = setInterval(() => this.callAPIs(), 15000)
  }
  ngOnDestroy(): void {
     if (this.timer) {
      clearInterval(this.timer);
    }
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

  getWaitingDishes(): number{
    let waitingOrders = 0;

    this.orders.forEach( o =>{
      if(o.completionDate == null)
        waitingOrders += o.qty!;
    })

    return waitingOrders;
  }

  
  getPreparedDishes(): number{
    let preparedOrders = 0;

    this.orders.forEach( o =>{
      if(o.completionDate != null)
        preparedOrders += o.qty!;
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
        orderedDishes.push(key);
        count++;
      }
    });

    return orderedDishes;
  }

  findDish(name: string): string{
    return environment.apiImage + this.orders.find(o => o.name == name)!.image!;
  }

  fillAndOrganiseOrdersByPeople() {
    this.requestedOrders.clear(); // <--- svuota la mappa prima di riempirla

    this.orders.forEach(order => {
      if (this.requestedOrders.has(order.name!)) {
        this.requestedOrders.set(order.name!, order.qty! + this.requestedOrders.get(order.name!)!);
      } else {
        this.requestedOrders.set(order.name!, order.qty!);
      }
    });

    //ci permette di ordinare la map in base al numero di quantità ordinata
    this.requestedOrders  = new Map<string, number> (Array.from(this.requestedOrders.entries()).sort((a, b) => b[1] - a[1]))
  }

  Logout():void {
    this.auth.logout().subscribe(() => this.router.navigate(['login']))
  }
}
