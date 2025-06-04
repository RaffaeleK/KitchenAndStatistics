import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  dateTime: Date;
  private timer: any;

  constructor(public kitchenComponent : KitchenComponent, private auth: AuthService, private router: Router)
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

  Logout():void {
    this.auth.logout().subscribe(() => this.router.navigate(['login']))
  }
}

