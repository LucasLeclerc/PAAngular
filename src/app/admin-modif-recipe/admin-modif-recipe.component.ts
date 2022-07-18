import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';
import { Location } from '@angular/common'

@Component({
  selector: 'app-admin-modif-recipe',
  templateUrl: './admin-modif-recipe.component.html',
  styleUrls: ['./admin-modif-recipe.component.css']
})
export class AdminModifRecipeComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipe:Recipe=new Recipe();
  state:string="view";
  num!:HTMLElement|null;

  constructor(private ESGIService:ESGIService,private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.UserService.pass===""){
      console.log("merde")
      this.router.navigate(["/adminRecipe"]).then();
    }
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else if(this.ESGIService.user.role==="Admin"){
      this.user=this.ESGIService.user;
      this.recipe= new Recipe();
      this.ESGIService.user.getUser();
      this.user=this.ESGIService.user;
      this.user.instance.get("/recipe/"+this.UserService.pass,{}).
      then( (response) => {
        console.log(response.data._id,response.data.id)
        let tmp =new Recipe(response.data._id,response.data.tittle,response.data.description,response.data.price,response.data.ingredient,response.data.timeToPrepare,response.data.instruction,response.data.photo,response.data.requirerTool,response.data.type);
        this.recipe=tmp;       
        console.log(this.recipe);
        this.error=false;
      }, (error) => {
        console.log(error);
        this.activity="null";
      });
    }else{
      this.user=this.ESGIService.user;
    }
  }
  updateRecipe(){
    let tittle:string=(<HTMLInputElement>document.getElementById('tittle')).value;
    let description:string=(<HTMLInputElement>document.getElementById('description')).value;
    let instruction:string=(<HTMLInputElement>document.getElementById('instruction')).value;
    let time:number=+(<HTMLInputElement>document.getElementById('time')).value;
    let cost:number=+(<HTMLInputElement>document.getElementById('cost')).value;
    console.log(tittle,time,cost)
    this.user.instance.put("/recipe/"+this.recipe.id,{
      tittle:tittle,
      description:description,
      instruction:instruction,
      timeToPrepare:time,
      price:cost
    }).
    then( (response) => {
      this.valideMessage="La recette à bien été mis à jour.";
      this.activity="good";
      console.log(response);
      this.ESGIService.user.getUser();

    }, (error) => {
      console.log(error);
      this.valideMessage="Erreur lors de la mise à jour de la recette.\nVeuillez réessayer plus tard.";
      this.activity="error";
    });
  }
  switchToBack(){
    this.router.navigate(["/adminRecipe"]).then();
  }
  return(){
    this.location.back()
  }
}