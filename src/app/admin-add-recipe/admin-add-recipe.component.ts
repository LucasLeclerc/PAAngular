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
import { Location } from '@angular/common'

@Component({
  selector: 'app-admin-add-recipe',
  templateUrl: './admin-add-recipe.component.html',
  styleUrls: ['./admin-add-recipe.component.css']
})
export class AdminAddRecipeComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipe:Recipe=new Recipe();
  num!:HTMLElement|null;

  constructor(private ESGIService:ESGIService,private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
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
    let tittle:string=(<HTMLInputElement>document.getElementById('tittle')).value;
    let description:string=(<HTMLInputElement>document.getElementById('description')).value;
    let photo:string=(<HTMLInputElement>document.getElementById('photo')).value;
    let instruction:string=(<HTMLInputElement>document.getElementById('instruction')).value;
    let timeToPrepare:number=+(<HTMLInputElement>document.getElementById('timeToPrepare')).value;
    let price:number=+(<HTMLInputElement>document.getElementById('price')).value;
    if(tittle!==""&&photo!==""&&description!==""&&instruction!==""&&timeToPrepare!==0&&price!==0){
      this.user.instance.post("/recipe/",{
        tittle:tittle,
        description:description,
        photo:photo,
        instruction:instruction,
        timeToPrepare:timeToPrepare,
        price:price,
        requiereTool: [],
        ingredient: [],
        requirerTool: [],
        type: [
          "type de test"
        ]
      }).
      then( (response) => {
        this.valideMessage="La recette à bien été ajoutée.";
        this.activity="good";
        console.log(response);  
      }, (error) => {
        console.log(error);
        this.valideMessage="Erreur lors de l'ajout d'une recette'.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }else{
      this.valideMessage="Erreur tout les champ on besoin d'être remplis.\nVeuillez réessayer.";
    }
  }
  return(){
    this.location.back();
  }

}
