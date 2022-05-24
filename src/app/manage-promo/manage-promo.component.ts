import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Resto } from '../models/resto.models';

@Component({
  selector: 'app-manage-promo',
  templateUrl: './manage-promo.component.html',
  styleUrls: ['./manage-promo.component.css']
})
export class ManagePromoComponent implements OnInit {
  user:User;
  error=false;
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
  showCreatePromo(){
    this.router.navigate(["/New-Promo"]).then();
  }
  showDisplayPromo(){
    this.router.navigate(["/All-Promo"]).then();
  }
  backToNeutral(){
    this.ESGIService.setUserPage(this.router);
  }

}
