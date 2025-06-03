import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit, OnDestroy{
  dateTime: Date;
  private timer: any;
  constructor() {
    this.dateTime = new Date();
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
