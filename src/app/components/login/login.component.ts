import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailInput: string = 'kitchen'
  passwordInput : string = 'PascalPWAPI2025' 
  errorstring : string = ''

  constructor(private authservice: AuthService, private route: Router){

  }
  login(){
    this.authservice.login(this.emailInput,this.passwordInput).subscribe({
      next : () => {
        this.route.navigate(['/']);
        this.errorstring = ''
      },
      error: () => this.errorstring = 'Credenziali non valide. Riprova'
    })

  }
}
