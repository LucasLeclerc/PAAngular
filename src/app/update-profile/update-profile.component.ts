import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Menu } from '../models/menu.models';
import { Promo } from '../models/promo.models';
import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipe:Recipe=new Recipe();
  state:string="view";
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
  updateUser(){
    let prenom:string=(<HTMLInputElement>document.getElementById('surname')).value;
    let nom:string=(<HTMLInputElement>document.getElementById('name')).value;
    let date:string=(<HTMLInputElement>document.getElementById('birthdate')).value;
    let numero:number=+(<HTMLInputElement>document.getElementById('number')).value;
    let rue:string=(<HTMLInputElement>document.getElementById('street')).value;
    let postal:string=(<HTMLInputElement>document.getElementById('postalCode')).value;
    let ville:string=(<HTMLInputElement>document.getElementById('town')).value;
    let pays:string=(<HTMLInputElement>document.getElementById('country')).value;
    this.user.instance.put("/profile/updateProfile",{
      name:prenom,
      surname:nom,
      birthdate:date,
      adress:{
        number:numero,
        street:rue,
        postalCode:postal,
        town:ville,
        country:pays
      }
    }).
    then( (response) => {
      this.valideMessage="Le profile à bien été mis à jour.";
      this.activity="good";
      console.log(response);
      this.ESGIService.user.getUser();

    }, (error) => {
      console.log(error);
      this.valideMessage="Erreur lors de la mise à jour du profile.\nVeuillez réessayer plus tard.";
      this.activity="error";
    });
  }
  switchToUpdate(){
    this.state="update"; 
  }
  switchToBack(){
    this.state="view"; 
  }
  return(){
    this.ESGIService.setUserPage(this.router);
  }
}

