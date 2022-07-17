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
  selector: 'app-admin-one-recipe',
  templateUrl: './admin-one-recipe.component.html',
  styleUrls: ['./admin-one-recipe.component.css']
})
export class AdminOneRecipeComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipe:Recipe=new Recipe();

  constructor(private ESGIService:ESGIService,private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.UserService.pass===""){
      console.log("merde");
      this.router.navigate(["/allRecipe"]).then();
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
      this.UserService.pass="";
      this.error=false;
    }, (error) => {
      console.log(error);
      this.activity="null";
    });      
    }else{
      this.ESGIService.setUserPage(this.router);
    }
  }
  verifDelRecipe(){
    this.activity="preDell";
  }
  showModifRecipe(){    
    this.UserService.pass=this.recipe.id;
    this.router.navigate(["/updateRecipe"]).then();
  }
  delRecipe(){
    try{
    this.user.instance.delete("/recipe/"+this.recipe.id,{}).
    then( (response) => {
      this.activity="good"
      this.valideMessage="La recette à bien été supprimer."
    }, (error) => {
      console.log(error);
      this.activity="error";
      this.valideMessage="Recette non trouver, veuillez réessayer plus tard."
    });
    }catch{
      this.activity="error";
      this.valideMessage="Recette non trouver, veuillez réessayer plus tard."
    }
  }
  return(){
    this.location.back()
  }
}