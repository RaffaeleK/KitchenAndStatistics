import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  dateTime: Date;
  private timer: any;

  constructor()
  {
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
