import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(private storageService: StorageService,private authService:AuthService) {
    // storageService.loadUsers();
  }
  
  ngOnInit(): void {
    this.storageService.loadUsers();
    // this.isLoggedIn=this.authService.isLoggedIn();
  }
  // isLogged():boolean{
  //   return this.authService.isLoggedIn();
  // }
}
