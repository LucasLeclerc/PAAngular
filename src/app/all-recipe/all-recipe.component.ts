import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-all-recipe',
  templateUrl: './all-recipe.component.html',
  styleUrls: ['./all-recipe.component.css']
})
export class AllRecipeComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  listeRecipe:Recipe[] =[];
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
      this.listeRecipe=[];
      this.user.instance.get("/cart/",{}).
    then( (response) => {
      response.data.forEach((element: {
        type: string[] | undefined;
        requirerTool: string[] | undefined;
        photo: string | undefined;
        instruction: string | undefined;
        timeToPrepare: number | undefined;
        ingredient: string[] | undefined;
        description: string | undefined;
        tittle: string | undefined; _id: string | undefined; price: number | undefined; 
      }) => {
        let tmp =new Recipe(element._id,element.tittle,element.description,element.price,element.ingredient,element.timeToPrepare,element.instruction,element.photo,element.requirerTool,element.type);
        this.listeRecipe.push(tmp);
      });
      console.log(this.listeRecipe);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
    }
  }
  showDisplayOneRecipe(id:string){
    this.UserService.pass=id;
    this.router.navigate(["/recipe"]).then();
  }
  backToNeutral(){
    this.router.navigate(["/manage-Promo"]).then();
  }

}
