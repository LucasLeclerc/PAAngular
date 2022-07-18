import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { CartContent } from '../models/cartContent.models';
import { Recipe } from '../models/recipe.models';
import { Location } from '@angular/common'
import { Adress } from '../models/adress.models';

@Component({
  selector: 'app-cart-planification',
  templateUrl: './cart-planification.component.html',
  styleUrls: ['./cart-planification.component.css']
})
export class CartPlanificationComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  deleting:CartContent=new CartContent();
  modified:boolean=false;
  list:{recette:Recipe,quantity:number}[]=[];
  interventionList:{recette:Recipe,quantity:number,date:string}[]=[];
  preparatorList:User[]=[];
  today:Date=new Date()
  price:number=0;

  constructor(private ESGIService:ESGIService, private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    console.log("a")
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{console.log("b")
    this.ESGIService.user.getUser();
    this.user=this.ESGIService.user;
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
        this.list.push({recette:recipe,quantity:tmp.quantity});
      });
      this.error=false;
    }, (error) => {
      console.log(error);
    });
    
    
    
  }
  }
  getPrepDispo(){
    if(!this.verifAllGood()){
      this.error=true;
      return false
    }
    this.activity="prep"
    let date:string=(<HTMLInputElement>document.getElementById('interventionDate')).value;
    let hour:string=(<HTMLInputElement>document.getElementById('interventionHour')).value;
    let dateHour=date+"T"+hour+"Z";
    this.preparatorList=[]
    this.user.instance.get("/preparator/getPreparator",{}).
    then( (response) => {
      console.log(response.data)
      response.data.prep.forEach((element: { id: string; login: string; role: string; name: string; surname: string; birthdate: string; adress: Adress; email: string; cart: string; wish: string; favorite: string[]; stock: string; history: string; material: string; orderinProgress: string; photo: string; } ) => {
        console.log(element)
        let prep=new User()
        prep.setWithData(element); 
        console.log("youou",prep)       
        this.preparatorList.push(prep);
      });
      this.error=false;
    }, (error) => {
      console.log(error);
    });
    return true;

  }
  verifAllGood(){    
    let date:string=(<HTMLInputElement>document.getElementById('interventionDate')).value;
    let hour:string=(<HTMLInputElement>document.getElementById('interventionHour')).value;
    let recipe:string=(<HTMLInputElement>document.getElementById('listRecipe')).value;
    let quantity:number=+(<HTMLInputElement>document.getElementById('quantity')).value;
    if(date===""||hour===""||recipe===""||quantity<1){
      this.error=true;
      return false
    }
    if(new Date(date)<this.today){
      this.error=true;
      return false
    }
    return true;
    
  }
  check(){
    if(this.activity!=="neutre"){
      this.activity="neutre"
      this.error=false;
    }
  }







  setPlanning(){
    let date:string=(<HTMLInputElement>document.getElementById('interventionDate')).value;
    let hour:string=(<HTMLInputElement>document.getElementById('interventionHour')).value;
    let recipe:string=(<HTMLInputElement>document.getElementById('listRecipe')).value;
    let quantity:number=+(<HTMLInputElement>document.getElementById('quantity')).value;
    if(!this.verifAllGood()){
      this.error=true;
      return ;
    }
    let effect=0;
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].recette.id===recipe){
        if(this.list[i].quantity>=quantity){
          this.interventionList.push({recette:this.list[i].recette,quantity:quantity,date:date+"T"+hour+"Z"})
          this.list[i].quantity-=quantity;
          effect+=1;
          if(this.list[i].quantity===0){
            this.list.splice(i,1);
          }
          if(this.list.length===0){
            this.activity="end";
          }          
        }
      }
    }  
  }
  sendPlanning(){
    this.user.instance.put("/cart/order",{
      donnee:this.interventionList
    }).
    then( (response) => {
      this.error=false;
      this.router.navigate(['/sucess']).then()
    }, (error) => {
      console.log(error);
    });
  }

}
