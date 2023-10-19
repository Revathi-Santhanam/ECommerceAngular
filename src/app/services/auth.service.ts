import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}
  isValidUser(user: User): boolean {
    let users: User[] = this.storageService.getAllUsers();
    let isUser: boolean = false;
    for (let u of users) {
      if (u.email === user.email && u.password === user.password) {
        isUser = true;
        this.storageService.setLoggedInUser(u);
        break;
      }
    }
    return isUser;
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  getLoggedInUser(): User {
    return this.storageService.getLoggedInUser();
  }
  // checkOut() {
  //   this.storageService.removeCartProducts();
  // }

  logout(): void {
    this.storageService.removeLoggedInUser();
  }
  isValidRegister(user: User): boolean {
    let users: User[] = this.storageService.getAllUsers();
    return (
      users.findIndex(
        (u) => u.email === user.email && u.password === user.password
      ) !== -1
    );
  }
}
