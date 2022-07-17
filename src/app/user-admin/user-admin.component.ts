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
    }else if(this.ESGIService.user.role==="Admin"){
      this.user=this.ESGIService.user;
      
    }else{
      this.ESGIService.setUserPage(this.router);
    }
  }
  viewTool(){
    this.router.navigate(["/allTool"]).then();
  }
  viewRecipe(){
    this.router.navigate(["/adminRecipe"]).then();
  }
  viewRequest(){
    this.router.navigate(["/currentAsk"]).then();
  }
  backToNeutral(){
    this.ESGIService.setUserPage(this.router);
  }

}
