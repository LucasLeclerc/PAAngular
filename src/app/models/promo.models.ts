import { Menu } from "./menu.models";
import { Product } from "./product.models";
import { User } from "./user.models";

export class Promo {
    id:string = "";
    name:string = "";
    price:number=0;
    promotionType:string="";
    beginDate:Date=new Date();
    endDate:Date=new Date();
    contentMenu:Menu[] =[];
    contentProduct:Product[] =[];
    constructor(id:string="",name:string="",price:number=0,promotionType:string="",beginingDate:string="",endDate:string="") {
        this.id=id;
        this.name=name;
        this.price=price;
        this.promotionType=promotionType; 
        this.beginDate=new Date(beginingDate);
        this.endDate=new Date(endDate);      
    }
    getContent(tabId:string[],user:User){
        tabId.forEach(elemen=>{
            let verif=false;
            user.instance.get("/"+user.role.toLowerCase()+"/getProduct/"+elemen,{}).
            then( (response) => {
                this.contentProduct.push(new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type));
            }, (error) => {
                console.log(error);
                verif=true;
            });
            if(verif){
                user.instance.get("/admin/getMenu/"+elemen,{}).
                then( async (response) => {
                    let tmp=new Menu(response.data._id,response.data.name,response.data.price,response.data.description);
                    await tmp.getContent(response.data.content,user);
                    this.contentMenu.push(tmp);
                    verif=false;
                }, (error) => {
                    console.log(error);
                    verif=true;
                }); 
            }
        })
    }
    
}