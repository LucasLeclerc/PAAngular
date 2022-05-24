import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Resto } from '../models/resto.models';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  user:User;  
  error=false;
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) 
  {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      this.router.navigate(["/login"]).then();
    }else{
      this.user=this.ESGIService.user;
    }
  }
  showProduct(){
    this.router.navigate(["/manage-Product"]).then();
  }
  showMenu(){
    this.router.navigate(["/manage-Menu"]).then();
  }
  showPromo(){
    this.router.navigate(["/manage-Promo"]).then();
  }
  showOrder(){
    this.router.navigate(["/manage-Order"]).then();
  }
  backToNeutral(){
    this.ESGIService.setUserPage(this.router);
  }

}
