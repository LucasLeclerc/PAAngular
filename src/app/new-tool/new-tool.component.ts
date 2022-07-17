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
  selector: 'app-new-tool',
  templateUrl: './new-tool.component.html',
  styleUrls: ['./new-tool.component.css']
})
export class NewToolComponent implements OnInit {
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
    if(this.user.login==="Invité"||this.user.role!=="Admin"){
      console.log("merde")
      this.ESGIService.setUserPage(this.router)
    }else{
      this.user=this.ESGIService.user;
    }
  }
  addTool(){
    let nom:string=(<HTMLInputElement>document.getElementById('name')).value;
    let photo:string=(<HTMLInputElement>document.getElementById('photo')).value;
    let description:string=(<HTMLInputElement>document.getElementById('description')).value;
    if(nom!==""&&photo!==""&&description!==""){
      this.user.instance.post("/cart/createTool",{
        name:nom,
        photo:photo,
        description:description
      }).
      then( (response) => {
        this.valideMessage="L'outil à bien été ajouté.";
        this.activity="good";
        console.log(response);  
      }, (error) => {
        console.log(error);
        this.valideMessage="Erreur lors de l'ajout de l'outil.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }else{
      this.valideMessage="Erreur tout les champ on besoin d'être remplis.\nVeuillez réessayer.";
    }
  }
  return(){
    
    this.router.navigate(["/allTool"]).then();
  }


}
