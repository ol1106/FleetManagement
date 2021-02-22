import {Component, OnInit} from "@angular/core";

import {MatDialog, MatIconRegistry} from "@angular/material";
import { User } from "./models/user";
import { TokenStorageService } from "./_services/token-storage.service";

@Component({
    selector: 'ngx-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    username: string;
    currentUser: User;
  
    constructor(private tokenStorageService: TokenStorageService) { }
  
    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.currentUser=this.tokenStorageService.getUser();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        this.username = user.username;
      }
    }
  
    logout(): void {
      this.tokenStorageService.signOut();
      window.location.reload();
    }

}

