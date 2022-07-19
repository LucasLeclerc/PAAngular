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
      router.navigate(["/user-Admin"]).then();
    }else     if(this.user.role==="Admin"){
      router.navigate(["/user-Admin"]).then();
    }else     if(this.user.role==="Preparator"){
      router.navigate(["/profile"]).then();
    }else     if(this.user.role==="Customer"){
      router.navigate(["/profile"]).then();
    }else{
      router.navigate(["/login"]).then();
    }
  }
}