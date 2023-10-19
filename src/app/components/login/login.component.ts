import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error:string='';
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(loginForm: NgForm) {
    if (this.authService.isValidUser(loginForm.value)) {
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.error="invalid!!!!"
    }
  }
}
