import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { KitchenComponent } from "./components/kitchen/kitchen.component";
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KitchenAndStatistics';
  constructor(public authservice: AuthService){
    //authservice.logout().subscribe()
  }
}
