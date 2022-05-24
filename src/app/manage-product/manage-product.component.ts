import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Resto } from '../models/resto.models';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
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
  showCreateProduct(){
    this.router.navigate(["/New-Product"]).then();
  }
  showDisplayProducts(){
    this.router.navigate(["/All-Product"]).then();
  }
  backToNeutral(){
    this.ESGIService.setUserPage(this.router);
  }

}
