import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Tool } from '../models/tool.models';
import { Recipe } from '../models/recipe.models';
import { CartContent } from '../models/cartContent.models';
import { Location } from '@angular/common'

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css']
})
export class FavListComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  favList:Recipe[]=[];
  deleting:Recipe=new Recipe();
  modified:boolean=false;

  constructor(private ESGIService:ESGIService, private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      this.ESGIService.user.getUser();
      this.user=this.ESGIService.user;
      this.user.instance.get("/cart/allFavContent",{}).
      then( (response) => {
        console.log(response.data)
        response.data.forEach((element: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; }) => {
          console.log(element)
          let recipe=new Recipe()
          recipe.setWithData(element);
          this.favList.push(recipe);
        });        
        this.error=false;
      }, (error) => {
        console.log(error);
      });
    }
  }

  askDel(id:string){
    for (let i=0; i<this.favList.length;i++){
      if(this.favList[i].id===id){
        this.deleting=this.favList[i];
        this.activity="askDel";
        console.log(this.deleting)
      }
    }
  }

  deleteFavContent(){
    this.user.instance.delete("/cart/removeRecipeFromFavorite/"+this.deleting.id,{}).
      then( (response) => {
        this.valideMessage="La recette a bien été retirer des favories."
        this.activity="good";
        console.log(response);
      }, (error) => {
        this.valideMessage="La recette n'a pas pus être retirer des favories.\n Veuillez réessayer plus tard."
        this.activity="error";
        console.log(error);
      });
      let tmp=this.favList.indexOf(this.deleting)
      this.favList.splice(tmp,1);
      this.deleting=new Recipe();
  }
  neutral(){
    this.activity="neutre";
    this.deleting=new Recipe();
  }
  goToRecipe(passId:string){
    this.UserService.pass=passId;
    this.router.navigate(["/recipe"]).then();
  }
  return(){
    this.location.back()
  }

}
