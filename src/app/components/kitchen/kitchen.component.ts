import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent /* implements OnInit, OnDestroy */ {
  dateTime: Date;

  constructor() {
    this.dateTime = new Date();
  }
  // ngOnInit(): void {
  //   this.dateTime = setInterval(() => {
  //     this.dateTime = new Date().;
  //   }
  // }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
}
