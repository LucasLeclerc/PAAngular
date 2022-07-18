import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  recipeList:Recipe[]=[];

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else if(this.ESGIService.user.role=="Admin"){
      this.user=this.ESGIService.user;
      this.recipeList=[];
      this.user.instance.get("/recipe",{}).
      then( (response) => {
        response.data.forEach((element: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; }) => {
          let tmp =new Recipe();
          tmp.setWithData(element);
          this.recipeList.push(tmp);
        });
        console.log(this.recipeList);
        this.error=false;
      }, (error) => {
        console.log(error);
      });
    }else{      
      this.ESGIService.setUserPage(this.router);      
    }
  }
  newRecipe(){
    this.router.navigate(["/addRecipe"]).then();
  }
  showDisplayOnerecipe(id:string){
    this.UserService.pass=id;
    this.router.navigate(["/oneRecipe"]).then();
  }
}