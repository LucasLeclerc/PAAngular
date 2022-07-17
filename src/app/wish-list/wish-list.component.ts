import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Menu } from '../models/menu.models';
import { Promo } from '../models/promo.models';
import { Tool } from '../models/tool.models';
import { Recipe } from '../models/recipe.models';
import { CartContent } from '../models/cartContent.models';
import { Location } from '@angular/common'

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  wishList:Recipe[]=[];
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
      this.user.instance.get("/cart/allWishContent",{}).
      then( (response) => {
        console.log(response.data)
        response.data.forEach((element: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; }) => {
          console.log(element)
          let recipe=new Recipe()
          recipe.setWithData(element);
          this.wishList.push(recipe);
        });        
        this.error=false;
      }, (error) => {
        console.log(error);
      });
    }
  }

  askDel(id:string){
    for (let i=0; i<this.wishList.length;i++){
      if(this.wishList[i].id===id){
        this.deleting=this.wishList[i];
        this.activity="askDel";
        console.log(this.deleting)
      }
    }
  }

  deleteFavContent(){
    this.user.instance.delete("/cart/removeRecipeFromWishList/"+this.deleting.id,{}).
      then( (response) => {
        this.valideMessage="La recette a bien été retirer de la liste des souhaits."
        this.activity="good";
        console.log(response);
      }, (error) => {
        this.valideMessage="La recette n'a pas pus être retirer de la liste des souhaits.\n Veuillez réessayer plus tard."
        this.activity="error";
        console.log(error);
      });
      let tmp=this.wishList.indexOf(this.deleting)
      this.wishList.splice(tmp,1);
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
