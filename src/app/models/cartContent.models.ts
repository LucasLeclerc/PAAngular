import { Recipe } from "./recipe.models";

export class CartContent {
    id:string = "";
    quantity:number = 0;
    recipe:Recipe=new Recipe();
    numbercart:number=0;
    constructor(id:string="",quantity:number=0,recipe:Recipe=new Recipe(),numbercart:number=0) {
        this.id=id;
        this.quantity=quantity;
        this.numbercart=numbercart;
        this.recipe=recipe;
    }
}