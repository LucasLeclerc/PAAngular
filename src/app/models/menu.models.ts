import { Product } from "./product.models";
import { User } from "./user.models";

export class Menu {
    id:string = "";
    name:string = "";
    price:number=0;
    description:string = "";
    content:Product[]=[];
    constructor(id:string="",name:string="",price:number=0,description:string="") {
        this.id=id;
        this.name=name;
        this.price=price;
        this.description=description;    
    }
    getContent(tabId:string[],user:User){
        tabId.forEach(elemen=>{
            user.instance.get("/"+user.role+"/getProduct/"+elemen,{}).
            then( (response) => {
                this.content.push(new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type));
            }, (error) => {
                console.log(error);
            });
        })
    }
}