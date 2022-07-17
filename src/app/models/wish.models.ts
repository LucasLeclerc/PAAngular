import { Recipe } from "./recipe.models";

export class Wish {
    id:string = "";
    quantity:number = 0;
    recipe:Recipe=new Recipe();
    constructor(id:string="",quantity:number=0,recipe:Recipe=new Recipe()) {
        this.id=id;
        this.quantity=quantity;
        this.recipe=recipe;
    }
}