import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})

export class ESGIService{
  nb:number=0;
  url:string="http://localhost:3001/";
  user:User=new User("","","Invité");
  interPage:string="";
  setUserPage(router:Router){
    if(this.user.role==="BigBoss"){
      router.navigate(["/user-BigBoss"]).then();
    }else     if(this.user.role==="Admin"){
      router.navigate(["/user-Admin"]).then();
    }else     if(this.user.role==="Livreur"){
      router.navigate(["/user-Livreur"]).then();
    }else     if(this.user.role==="Preparator"){
      router.navigate(["/user-Preparator"]).then();
    }else     if(this.user.role==="Customer"){
      router.navigate(["/user-Customer"]).then();
    }else{
      router.navigate(["/login"]).then();
    }
  }
}