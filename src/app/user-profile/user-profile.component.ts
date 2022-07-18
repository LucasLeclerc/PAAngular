import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipe:Recipe=new Recipe();
  num!:HTMLElement|null;

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      this.user=this.ESGIService.user;
    }
  }

  toAsking(){
    this.router.navigate(["/switchToPrep"]).then();
  }



}
