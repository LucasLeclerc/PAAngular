import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-one-recipe',
  templateUrl: './one-recipe.component.html',
  styleUrls: ['./one-recipe.component.css']
})
export class OneRecipeComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  fav:boolean=false;
  wish:boolean=false;
  recipe:Recipe=new Recipe();

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      if(this.UserService.pass===""){
        console.log("merde")
        this.router.navigate(["/allRecipe"]).then();
      }
      this.recipe= new Recipe();
      this.ESGIService.user.getUser();
      this.user=this.ESGIService.user;
      this.user.instance.get("/cart/recipe/"+this.UserService.pass,{}).
    then( (response) => {
      console.log(response.data._id,response.data.id)
      let tmp =new Recipe(response.data._id,response.data.tittle,response.data.description,response.data.price,response.data.ingredient,response.data.timeToPrepare,response.data.instruction,response.data.photo,response.data.requirerTool,response.data.type);
      this.recipe=tmp;       
      console.log(this.recipe);
      this.error=false;
      if (this.user.favorite.includes(this.recipe.id)){
        this.fav=true;
      }
      if (this.user.wish.includes(this.recipe.id)){
        this.wish=true;
      }
    }, (error) => {
      console.log(error);
    });

    };
  }
  updateValue(){
    let tmp=document.getElementById('quantity');
    let tmp2=document.getElementById('montant');
    if(tmp && tmp2){
      let valTmp:number=+(<HTMLInputElement>tmp).value;
      tmp2.textContent=(valTmp * this.recipe.price).toString();
    }
  }
  
  /* showCommand(){
    this.activity="command";
    this.num=document.getElementById('quantity');
    console.log(this.num,(<HTMLInputElement>this.num).value);
    if(this.num){
      console.log("toto")
      this.num.addEventListener('change', this.updateValue);
    }
  } */

  addToCart(){
    let tmp=document.getElementById('quantity');
    let quantity:number=+(<HTMLInputElement>tmp).value;
    this.user.instance.put("/cart/addRecipeToCart",{
      idRecipe:this.recipe.id,
      quantity:quantity,
      numberCart:123
    }).
    then( (response) => {
      this.valideMessage="La recette à bien été ajouter au panier.";
      this.activity="pass";      
    }, (error) => {
      console.log(error);
      this.valideMessage="Erreur lors de l'ajout au panier.\nVeuillez réessayer plus tard.";
      this.activity="error";
    });
  }

  toFav(){
    if (this.fav===false){
      this.user.instance.put("/cart/addRecipeToFavorite/"+this.recipe.id,{
      }).
      then( (response) => {
        this.valideMessage="La recette à bien été ajouter aux favories.";
        this.activity="good";  
        this.fav=true;    
      }, (error) => {
        console.log(error);
        this.valideMessage="Erreur lors de l'ajout aux favories.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }

  }
  RemoveFav(){
    if (this.fav===true){
      this.user.instance.delete("/cart/removeRecipeFromFavorite/"+this.recipe.id,{
      }).
      then( (response) => {
        this.valideMessage="La recette à bien été supprimer des favories.";
        this.activity="good";
        console.log(response);
        this.fav=false;   
      }, (error) => {
        console.log(error);
        this.valideMessage="Erreur lors de la suppression aux favories.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }
  }

  toWish(){
    if (this.wish===false){
      this.user.instance.put("/cart/addRecipeToWishList/"+this.recipe.id,{
      }).
      then( (response) => {
        this.valideMessage="La recette à bien été ajouter à la liste des souhaits.";
        this.activity="good";
        this.wish=true;    
      }, (error) => {
        console.log(error);
        this.valideMessage="Erreur lors de l'ajout à la liste des souhaits.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }

  }
  RemoveWish(){
    if (this.wish===true){
      this.user.instance.delete("/cart/removeRecipeFromWishList/"+this.recipe.id,{
      }).
      then( (response) => {
        this.valideMessage="La recette à bien été retirer de la liste des souhaits.";
        this.activity="good";
        console.log(response);
        this.wish=false;   
      }, (error) => {
        console.log(error);
        this.valideMessage="La recette n'a pas pus être retirer de la liste des souhaits.\nVeuillez réessayer plus tard.";
        this.activity="error";
      });
    }
  }

  toCart(){
    this.router.navigate(["/panier"]).then();
  }
  return(){
    this.router.navigate(["/allRecipe"]).then();
  }

}
