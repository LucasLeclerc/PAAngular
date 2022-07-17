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
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartDisplayComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  cartList:CartContent[]=[];
  defaultCartList:CartContent[]=[];
  deleting:CartContent=new CartContent();
  modified:boolean=false;
  price:number=0;

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
      this.cartList=[];
      this.user.instance.get("/cart/content",{}).
      then( (response) => {
        console.log(response.data)
        response.data.forEach((element: {
          recipe: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; };
          numberCart: number | undefined;
          quantity: number | undefined;
          id: string | undefined
        }) => {
          console.log(element)
          let recipe=new Recipe()
          recipe.setWithData(element.recipe);
          let tmp =new CartContent(element.id,element.quantity,recipe,element.numberCart);
          console.log("tmp ",tmp);
          this.cartList.push(tmp);
        });
        this.defaultCartList=this.cartList.slice(0,this.cartList.length);
        console.log(this.cartList,this.defaultCartList);
        this.error=false;
        this.priceUpdate();
      }, (error) => {
        console.log(error);
      });
      
    }
  }
  priceUpdate(){
    this.price=0;
    for (let elem of this.cartList) {
      this.price+=elem.recipe.price*elem.quantity;
    }
  }

  reduceQuantity(id:string){
    for (let i=0; i<this.cartList.length;i++){
      if(this.cartList[i].id===id&&this.cartList[i].quantity>1){
        console.log("test ",this.cartList[i])
        this.modified=true;
        this.cartList[i].quantity--
      }
    }
    this.priceUpdate();
  }
  augmentQuantity(id:string){
    for (let i=0; i<this.cartList.length;i++){
      if(this.cartList[i].id===id){
        console.log("test 2 ",this.cartList[i])
        this.modified=true;
        this.cartList[i].quantity++
      }
    }
    this.priceUpdate();
  }

  deleteCartContent(){
    this.user.instance.delete("/cart/removeRecipeFromCart/"+this.deleting.id,{}).
      then( (response) => {
        this.valideMessage="La recette a bien été retirer du panier."
        this.activity="good";
        console.log(response);
      }, (error) => {
        this.valideMessage="La recette n'a pas pus être retirer du panier.\n Veuillez réessayer plus tard."
        this.activity="error";
        console.log(error);
      });
      let tmp=this.defaultCartList.indexOf(this.deleting)
      this.defaultCartList.splice(tmp,1);
      this.cartList=this.defaultCartList;
      this.deleting=new CartContent()
  }
  askModif(){
    this.activity="askModif";
  }
  askDeleting(id:string){
    for (let i=0; i<this.defaultCartList.length;i++){
      if(this.defaultCartList[i].id===id){
        this.deleting=this.defaultCartList[i];
        this.activity="askDel";
        console.log(this.deleting)
      }
    }
  }
  modif(){
    let cpt=0;
    let inin=false;
    if (this.modified===false){
      this.valideMessage="Aucune recette n'a été modifiées dans le panier.\n Veuillez réessayer plus tard."
      this.activity='error';
      return; 
    }
    for (let i=0; i<this.cartList.length;i++){
      console.log(this.cartList[i],this.defaultCartList[i])
        inin=true;
        console.log("toto");
        this.user.instance.put("/cart/updateCart/"+this.defaultCartList[i].id,{          
          quantity:this.cartList[i].quantity
        }).
        then( (response) => {
          console.log(this.defaultCartList[i].id,this.cartList[i].quantity)
          console.log(response);
        }, (error) => {
          cpt++
          console.log(error);
        });
      }
    
    if(inin===true){
      if(cpt===0){
        this.valideMessage="Les recettes ont bien été modifiées dans le panier."
        this.activity='good';
      }else{
        this.valideMessage="Les recettes n'ont pas pus être modifiées dans le panier.\n Veuillez réessayer plus tard."
        this.activity='error';    
      }
    }
  }
  neutral(){
    this.activity="neutre";
    this.deleting=new CartContent();
    this.ngOnInit()
  }
  return(){
    this.location.back()
  }

}

