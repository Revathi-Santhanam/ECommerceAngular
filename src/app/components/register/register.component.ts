import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: string = '';
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  onSubmit(registerForm: NgForm) {
    // console.log(registerForm.value);
    if (this.authService.isValidRegister(registerForm.value)) {
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      this.error = '';
    }

    this.storageService.getNewUsers(registerForm.value);
  }
}
